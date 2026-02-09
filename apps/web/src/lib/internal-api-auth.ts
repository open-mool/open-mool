const encoder = new TextEncoder();

const toHex = (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('');
};

const signPayload = async (payload: string, secret: string) => {
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign'],
    );

    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
    return toHex(signature);
};

export const buildInternalApiHeaders = async (userId: string) => {
    const headers: Record<string, string> = {
        'x-user-id': userId,
    };

    const signingSecret = process.env.INTERNAL_PROXY_SIGNING_SECRET;
    if (signingSecret) {
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const payload = `${userId}.${timestamp}`;
        const signature = await signPayload(payload, signingSecret);
        headers['x-internal-auth'] = `v1:${timestamp}:${signature}`;
    }

    const legacySecret = process.env.API_SECRET;
    if (legacySecret) {
        headers['x-api-secret'] = legacySecret;
    }

    return headers;
};
