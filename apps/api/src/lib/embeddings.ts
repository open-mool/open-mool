export async function getGeminiEmbedding(text: string, apiKey: string): Promise<number[]> {
    const model = "text-embedding-004";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: {
                parts: [{ text }],
            },
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Gemini Embedding API error: ${response.status} ${error}`);
    }

    const data = (await response.json()) as any;
    return data.embedding.values;
}
