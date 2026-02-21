import { createRemoteJWKSet, jwtVerify } from 'jose'
import type { Context } from 'hono'
import { verifyInternalAuthHeader } from '../lib/internalAuth'

interface AuthEnv {
    CLERK_JWKS_URL?: string
    CLERK_ISSUER?: string
    CLERK_AUDIENCE?: string
    INTERNAL_PROXY_SIGNING_SECRET?: string
    API_SECRET?: string
    LOCAL_DEV_AUTH_BYPASS?: string
}

type AuthVariables = {
    jwtPayload: { sub?: string }
}

type AuthContext = Context<{ Bindings: AuthEnv; Variables: AuthVariables }>

const parseAudience = (audience: string | undefined) => {
    if (!audience) {
        return undefined
    }

    const values = audience
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)

    if (values.length === 0) {
        return undefined
    }

    return values.length === 1 ? values[0] : values
}

const getBearerToken = (authorizationHeader: string | undefined) => {
    if (!authorizationHeader) {
        return null
    }

    const [scheme, token] = authorizationHeader.split(' ')
    if (scheme !== 'Bearer' || !token) {
        return null
    }

    return token
}

const isLocalRequest = (url: string) => {
    try {
        const hostname = new URL(url).hostname
        return hostname === 'localhost' || hostname === '127.0.0.1'
    } catch {
        return false
    }
}

export const authMiddleware = () => {
    return async (c: AuthContext, next: () => Promise<void>) => {
        const localBypassEnabled = c.env.LOCAL_DEV_AUTH_BYPASS === 'true' && isLocalRequest(c.req.url)
        if (localBypassEnabled) {
            c.set('jwtPayload', { sub: 'dev_dummy_user' })
            return next()
        }

        const userId = c.req.header('x-user-id')
        const internalAuthHeader = c.req.header('x-internal-auth')

        if (userId && internalAuthHeader && c.env.INTERNAL_PROXY_SIGNING_SECRET) {
            const isValid = await verifyInternalAuthHeader({
                userId,
                headerValue: internalAuthHeader,
                secret: c.env.INTERNAL_PROXY_SIGNING_SECRET,
            })

            if (isValid) {
                c.set('jwtPayload', { sub: userId })
                return next()
            }
        }

        // Legacy fallback for deployments that have not switched to signed headers yet.
        const legacySecret = c.req.header('x-api-secret')
        if (userId && legacySecret && c.env.API_SECRET && legacySecret === c.env.API_SECRET) {
            c.set('jwtPayload', { sub: userId })
            return next()
        }

        const token = getBearerToken(c.req.header('authorization'))
        if (!token) {
            return c.json({ error: 'Unauthorized' }, 401)
        }

        if (!c.env.CLERK_JWKS_URL || !c.env.CLERK_ISSUER) {
            return c.json({ error: 'Auth configuration missing' }, 500)
        }

        try {
            const jwks = createRemoteJWKSet(new URL(c.env.CLERK_JWKS_URL))
            const { payload } = await jwtVerify(token, jwks, {
                issuer: c.env.CLERK_ISSUER,
                audience: parseAudience(c.env.CLERK_AUDIENCE),
            })

            if (!payload.sub) {
                return c.json({ error: 'Unauthorized' }, 401)
            }

            c.set('jwtPayload', payload as { sub: string })
            return next()
        } catch {
            return c.json({ error: 'Unauthorized' }, 401)
        }
    }
}

export const getAuthUserId = (c: Context) => {
    const context = c as Context<{ Variables: AuthVariables }>
    const payload = context.get('jwtPayload')
    return payload?.sub || null
}
