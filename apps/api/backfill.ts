import { getGeminiEmbedding } from './src/lib/embeddings';

export default {
    async fetch(request: Request, env: any) {
        if (new URL(request.url).pathname === '/backfill') {
            const { results } = await env.DB.prepare(
                `SELECT id, key, title, description, transcription, deities, places, botanicals FROM media WHERE processed = 1`
            ).all();

            let count = 0;
            for (const item of results) {
                try {
                    const deities = JSON.parse(item.deities || '[]');
                    const places = JSON.parse(item.places || '[]');
                    const botanicals = JSON.parse(item.botanicals || '[]');
                    const entitiesStr = [...deities, ...places, ...botanicals].join(' ');

                    const textToEmbed = `
                        Title: ${item.title}
                        Description: ${item.description || ''}
                        Transcription: ${item.transcription || ''}
                        Entities: ${entitiesStr}
                    `.trim();

                    const embedding = await getGeminiEmbedding(textToEmbed, env.GEMINI_API_KEY);

                    await env.VECTOR_INDEX.upsert([{
                        id: item.id.toString(),
                        values: embedding,
                        metadata: {
                            title: item.title,
                            transcription: (item.transcription || '').substring(0, 100)
                        }
                    }]);
                    count++;
                    console.log(`Backfilled item ${item.id}`);
                } catch (e) {
                    console.error(`Error backfilling item ${item.id}:`, e);
                }
            }
            return new Response(`Backfilled ${count} items`);
        }
        return new Response('Not found', { status: 404 });
    }
}
