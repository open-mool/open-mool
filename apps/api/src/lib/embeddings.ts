export async function getWorkersAiEmbedding(text: string, ai: any): Promise<number[]> {
    const aiResponse = await ai.run('@cf/baai/bge-base-en-v1.5', {
        text: [text]
    });

    // bge-base-en-v1.5 returns an object with a data array where each item has an embedding array
    if (!aiResponse || !aiResponse.data || !aiResponse.data[0]) {
        throw new Error('Failed to generate embedding from Workers AI');
    }

    return aiResponse.data[0];
}
