import { getGeminiEmbedding } from "./embeddings";

export interface ExtractedEntities {
    deities: string[];
    places: string[];
    botanicals: string[];
}

export interface RefineryEnv {
    DB: D1Database;
    STORAGE: R2Bucket;
    VECTOR_INDEX: VectorizeIndex;
    AI: any;
    GEMINI_API_KEY?: string;
}

export async function extractEntities(text: string, apiKey: string): Promise<ExtractedEntities> {
    if (!text || text.trim().length < 10) {
        return { deities: [], places: [], botanicals: [] };
    }

    const model = "gemini-1.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const prompt = `
Extract the following categories of entities from the transcription text below:
1. Deities: Gods, goddesses, spiritual figures, divine beings.
2. Places: Geographical locations, cities, villages, temples, shrines, mountains, rivers, landmarks.
3. Botanicals: Plants, herbs, trees, flowers, medicinal plants.

Return the result strictly as a JSON object with the following keys:
- deities (array of strings)
- places (array of strings)
- botanicals (array of strings)

If no entities are found for a category, return an empty array for that category.

Transcription:
"${text}"
`.trim();

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: prompt }]
            }],
            generationConfig: {
                responseMimeType: "application/json",
            }
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        console.error(`Gemini Extraction API error: ${response.status} ${error}`);
        return { deities: [], places: [], botanicals: [] };
    }

    try {
        const data = (await response.json()) as any;
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!content) {
            console.error('Gemini extraction returned no content:', JSON.stringify(data));
            return { deities: [], places: [], botanicals: [] };
        }
        
        return JSON.parse(content) as ExtractedEntities;
    } catch (e) {
        console.error('Failed to parse Gemini extraction response:', e);
        return { deities: [], places: [], botanicals: [] };
    }
}

/**
 * The Refinery: Background processing pipeline for media.
 * Handles transcription, entity extraction, and vector embedding.
 */
export async function processMedia(
    mediaId: number,
    key: string,
    title: string,
    description: string | null,
    userId: string,
    env: RefineryEnv
) {
    console.log(`[Refinery] Starting background processing for media ${mediaId} (${key})`);

    let transcription = '';
    const geminiApiKey = env.GEMINI_API_KEY;

    try {
        // 1. Transcription with Whisper
        const object = await env.STORAGE.get(key);
        if (object) {
            // Check if it's likely an audio/video file
            const isMedia = key.match(/\.(mp3|wav|ogg|m4a|mp4|webm|mov|avi|flv)$/i);
            
            if (isMedia) {
                const blob = await object.arrayBuffer();
                
                // Limit file size for Workers AI transcription (typically 25MB)
                if (blob.byteLength < 25 * 1024 * 1024) {
                    console.log(`[Refinery] Transcribing media ${mediaId}...`);
                    const aiResponse = await env.AI.run('@cf/openai/whisper', {
                        audio: [...new Uint8Array(blob)]
                    });
                    
                    if (aiResponse && aiResponse.text) {
                        transcription = aiResponse.text;
                        console.log(`[Refinery] Transcription complete for ${mediaId}`);
                        
                        // Save transcription to DB
                        await env.DB.prepare(
                            `UPDATE media SET transcription = ? WHERE id = ?`
                        ).bind(transcription, mediaId).run();
                    }
                } else {
                    console.warn(`[Refinery] File ${key} too large for transcription (${blob.byteLength} bytes)`);
                }
            }
        }

        // 2. Entity Extraction
        let extractedDeities: string[] = [];
        let extractedPlaces: string[] = [];
        let extractedBotanicals: string[] = [];
        
        if (geminiApiKey && transcription) {
            try {
                console.log(`[Refinery] Extracting entities for media ${mediaId}...`);
                const entities = await extractEntities(transcription, geminiApiKey);
                extractedDeities = entities.deities;
                extractedPlaces = entities.places;
                extractedBotanicals = entities.botanicals;
                
                await env.DB.prepare(
                    `UPDATE media SET deities = ?, places = ?, botanicals = ? WHERE id = ?`
                ).bind(
                    JSON.stringify(extractedDeities),
                    JSON.stringify(extractedPlaces),
                    JSON.stringify(extractedBotanicals),
                    mediaId
                ).run();
                console.log(`[Refinery] Entity extraction complete for ${mediaId}`);
            } catch (extractError) {
                console.error(`[Refinery] Entity extraction failed for ${mediaId}:`, extractError);
            }
        }

        // 3. Generate and save embedding
        if (geminiApiKey) {
            try {
                console.log(`[Refinery] Generating embedding for media ${mediaId}...`);
                // Include title, description, transcription, and extracted entities in the embedding
                const entitiesStr = [...extractedDeities, ...extractedPlaces, ...extractedBotanicals].join(' ');
                const textToEmbed = `
                    Title: ${title}
                    Description: ${description || ''}
                    Transcription: ${transcription}
                    Entities: ${entitiesStr}
                `.trim();
                
                const embedding = await getGeminiEmbedding(textToEmbed, geminiApiKey);
                
                await env.VECTOR_INDEX.upsert([
                    {
                        id: mediaId.toString(),
                        values: embedding,
                        metadata: { 
                            title, 
                            userId, 
                            transcription: transcription.substring(0, 100) 
                        }
                    }
                ]);
                
                // Mark as processed in DB
                await env.DB.prepare(
                    `UPDATE media SET processed = 1 WHERE id = ?`
                ).bind(mediaId).run();
                
                console.log(`[Refinery] Processing complete for media ${mediaId}`);
            } catch (embedError) {
                console.error(`[Refinery] Failed to generate/save embedding for ${mediaId}:`, embedError);
            }
        }
    } catch (error) {
        console.error(`[Refinery] Error processing media ${mediaId}:`, error);
    }
}
