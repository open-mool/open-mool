const encoder = new TextEncoder();

const toHex = (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('');
};

const timingSafeEqual = (a: string, b: string) => {
    if (a.length !== b.length) {
        return false;
    }

    let mismatch = 0;
    for (let index = 0; index < a.length; index += 1) {
        mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
    }

    return mismatch === 0;
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

const parseHeader = (headerValue: string) => {
    const [version, timestamp, signature] = headerValue.split(':');

    if (version !== 'v1' || !timestamp || !signature) {
        return null;
    }

    const timestampNumber = Number.parseInt(timestamp, 10);
    if (!Number.isFinite(timestampNumber)) {
        return null;
    }

    return {
        timestamp: timestampNumber,
        signature,
    };
};

export const verifyInternalAuthHeader = async ({
    userId,
    headerValue,
    secret,
    maxAgeSeconds = 300,
}: {
    userId: string;
    headerValue: string;
    secret: string;
    maxAgeSeconds?: number;
}) => {
    const parsed = parseHeader(headerValue);
    if (!parsed) {
        return false;
    }

    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - parsed.timestamp) > maxAgeSeconds) {
        return false;
    }

    const payload = `${userId}.${parsed.timestamp}`;
    const expectedSignature = await signPayload(payload, secret);

    return timingSafeEqual(expectedSignature, parsed.signature);
};
