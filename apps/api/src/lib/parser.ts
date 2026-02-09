export type MediaType = 'audio' | 'video' | 'image' | 'document' | 'unknown'

export type ParsedArchiveMetadata = {
    mediaType: MediaType
    detectedLanguage: string
    tags: string[]
    entities: string[]
}

type ParseInput = {
    key: string
    title: string
    description?: string | null
    transcription?: string | null
    language?: string | null
}

const mediaTypeMatchers: Array<{ type: MediaType; pattern: RegExp }> = [
    { type: 'audio', pattern: /\.(mp3|wav|ogg|m4a|aac|flac)$/i },
    { type: 'video', pattern: /\.(mp4|webm|mov|avi|mkv|flv)$/i },
    { type: 'image', pattern: /\.(jpg|jpeg|png|webp|gif|heic)$/i },
    { type: 'document', pattern: /\.(pdf|txt|doc|docx|rtf)$/i },
]

const tagDictionary: Array<{ tag: string; patterns: RegExp[] }> = [
    { tag: 'oral-history', patterns: [/oral history/i, /interview/i, /elder/i] },
    { tag: 'folk-song', patterns: [/song/i, /ballad/i, /lullaby/i, /jagar/i] },
    { tag: 'festival', patterns: [/festival/i, /celebration/i, /mela/i, /ritual/i] },
    { tag: 'language', patterns: [/dialect/i, /kumaoni/i, /garhwali/i, /jaunsari/i] },
    { tag: 'craft', patterns: [/weav/i, /craft/i, /handicraft/i, /loom/i] },
    { tag: 'agriculture', patterns: [/farm/i, /crop/i, /seed/i, /pasture/i] },
    { tag: 'ecology', patterns: [/forest/i, /river/i, /mountain/i, /glacier/i] },
    { tag: 'mythology', patterns: [/myth/i, /legend/i, /deity/i, /temple/i] },
]

const placeHints = [
    'Uttarakhand',
    'Ladakh',
    'Himachal',
    'Kinnaur',
    'Spiti',
    'Garhwal',
    'Kumaon',
    'Nepal',
    'Sikkim',
    'Bhutan',
]

const stopEntities = new Set([
    'The', 'This', 'That', 'These', 'Those', 'Open', 'Mool', 'And', 'Or', 'For',
])

const uniq = (values: string[]) => Array.from(new Set(values))

export const detectMediaType = (key: string): MediaType => {
    for (const matcher of mediaTypeMatchers) {
        if (matcher.pattern.test(key)) {
            return matcher.type
        }
    }
    return 'unknown'
}

const detectLanguage = (text: string, explicitLanguage?: string | null) => {
    if (explicitLanguage && explicitLanguage.trim().length > 0) {
        return explicitLanguage.trim().toLowerCase()
    }

    if (/[\u0900-\u097F]/.test(text)) {
        return 'hindi'
    }

    if (/[\u0F00-\u0FFF]/.test(text)) {
        return 'tibetan'
    }

    return 'english'
}

const extractTags = (text: string) => {
    const tags: string[] = []

    for (const entry of tagDictionary) {
        if (entry.patterns.some((pattern) => pattern.test(text))) {
            tags.push(entry.tag)
        }
    }

    return uniq(tags)
}

const extractEntities = (text: string) => {
    const entities: string[] = []

    const properNounMatches = text.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})\b/g) || []
    for (const match of properNounMatches) {
        const cleaned = match.trim()
        if (cleaned.length < 3 || stopEntities.has(cleaned)) {
            continue
        }
        entities.push(cleaned)
    }

    for (const place of placeHints) {
        if (new RegExp(`\\b${place}\\b`, 'i').test(text)) {
            entities.push(place)
        }
    }

    return uniq(entities).slice(0, 12)
}

export const parseArchiveMetadata = (input: ParseInput): ParsedArchiveMetadata => {
    const combinedText = `${input.title} ${input.description || ''} ${input.transcription || ''}`.trim()

    return {
        mediaType: detectMediaType(input.key),
        detectedLanguage: detectLanguage(combinedText, input.language),
        tags: extractTags(combinedText),
        entities: extractEntities(combinedText),
    }
}
