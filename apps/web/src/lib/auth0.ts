import { auth } from '@clerk/nextjs/server';

type SessionUser = {
    sub: string;
    email: string | null;
    name: string;
    picture: string | null;
};

type Session = {
    user: SessionUser;
};

type SessionClaims = Record<string, unknown> | null;

const readClaim = (claims: SessionClaims, key: string) => {
    const value = claims?.[key];
    return typeof value === 'string' ? value : null;
};

const resolveName = (claims: SessionClaims, email: string | null, fallback: string) => {
    const preferred = readClaim(claims, 'name') || readClaim(claims, 'full_name');
    if (preferred) {
        return preferred;
    }

    const given = readClaim(claims, 'given_name') || readClaim(claims, 'first_name');
    const family = readClaim(claims, 'family_name') || readClaim(claims, 'last_name');
    const composite = [given, family].filter(Boolean).join(' ').trim();

    if (composite) {
        return composite;
    }

    return email || fallback;
};

const getSession = async (): Promise<Session | null> => {
    const authState = await auth();

    if (!authState.userId) {
        return null;
    }

    const claims = (authState.sessionClaims || null) as SessionClaims;
    const email = readClaim(claims, 'email');
    const name = resolveName(claims, email, 'Guardian');
    const picture = readClaim(claims, 'picture') || readClaim(claims, 'image_url');

    return {
        user: {
            sub: authState.userId,
            email,
            name,
            picture,
        },
    };
};

export const auth0 = {
    getSession,
};

export const getLoginUrl = (returnTo = '/dashboard') => {
    return `/sign-in?redirect_url=${encodeURIComponent(returnTo)}`;
};
