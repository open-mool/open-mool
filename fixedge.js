const fs = require('fs');
const files = [
    'apps/web/src/app/api/admin/media/[id]/[action]/route.ts',
    'apps/web/src/app/api/admin/media/route.ts',
    'apps/web/src/app/api/upload/complete/route.ts',
    'apps/web/src/app/api/upload/multipart/[uploadId]/abort/route.ts',
    'apps/web/src/app/api/upload/multipart/[uploadId]/complete/route.ts',
    'apps/web/src/app/api/upload/multipart/[uploadId]/part/route.ts',
    'apps/web/src/app/api/upload/multipart/create/route.ts',
    'apps/web/src/app/api/upload/presigned/route.ts',
    'apps/web/src/app/auth/login/route.ts',
    'apps/web/src/app/auth/logout/route.ts',
    'apps/web/src/app/dashboard/admin/page.tsx',
    'apps/web/src/app/dashboard/settings/page.tsx',
    'apps/web/src/app/dashboard/upload/page.tsx',
    'apps/web/src/app/sign-in/[[...sign-in]]/page.tsx',
    'apps/web/src/app/sign-up/[[...sign-up]]/page.tsx'
];

files.forEach(f => {
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');
        if (!content.includes("export const runtime = 'edge'")) {
            // Find the last import and insert after it
            const importRegex = /^import\s+.*?(?:from\s+['"].*?['"]|['"].*?['"])\s*;?/gm;
            let lastMatch = null;
            let match;
            while ((match = importRegex.exec(content)) !== null) {
                lastMatch = match;
            }

            const insertStr = "\n\nexport const runtime = 'edge';\n";

            if (lastMatch) {
                const insertPos = lastMatch.index + lastMatch[0].length;
                content = content.slice(0, insertPos) + insertStr + content.slice(insertPos);
            } else {
                content = insertStr.trim() + "\n\n" + content;
            }
            fs.writeFileSync(f, content);
            console.log('Fixed ' + f);
        }
    } else {
        console.log('Not found: ' + f);
    }
});
