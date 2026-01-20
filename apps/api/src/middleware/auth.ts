import { jwk } from 'hono/jwk'
import type { Context } from 'hono'

interface AuthEnv {
    AUTH0_DOMAIN: string
    AUTH0_AUDIENCE: string
}

const normalizeAuth0Domain = (domain: string) => {
    const trimmed = domain.trim().replace(/\/+$/, '')
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed
    }
    return `https://${trimmed}`
}

export const authMiddleware = () => {
    return async (c: Context<{ Bindings: AuthEnv }>, next: () => Promise<void>) => {
        if (!c.env.AUTH0_DOMAIN || !c.env.AUTH0_AUDIENCE) {
            return c.json({ error: 'Auth configuration missing' }, 500)
        }

        const domain = normalizeAuth0Domain(c.env.AUTH0_DOMAIN)
        const handler = jwk({
            jwks_uri: `${domain}/.well-known/jwks.json`,
            alg: ['RS256'],
            verification: {
                iss: `${domain}/`,
                aud: c.env.AUTH0_AUDIENCE,
            },
        })

        return handler(c, next)
    }
}

export const getAuthUserId = (c: Context) => {
    const payload = c.get('jwtPayload') as { sub?: string } | undefined
    return payload?.sub || null
}
