import type { Config } from '@react-router/dev/config';

export default {
    ssr: false, // Disable SSR for static hosting (GitHub Pages)
    basename: '/',

    async prerender() {
        const languages = [
            'en',      // English (default - no prefix)
            'ro',      // Romanian
            'es',      // Spanish
            'fr',      // French
            'de',      // German
            'it',      // Italian
            'pt-BR',   // Brazilian Portuguese
            'pt-PT',   // European Portuguese
            'ru',      // Russian
            'zh-Hans', // Simplified Chinese
            'zh-Hant', // Traditional Chinese
            'ja',      // Japanese
            'ko',      // Korean
        ];

        const routes = ['/', '/download', '/contact'];

        const allPaths: string[] = [...routes];

        languages
            .slice(1)
            .forEach(lang => {
                routes.forEach(route => {
                    const path = `/${lang}${route === '/' ? '' : route}`;

                    allPaths.push(path);
                });
            });

        return allPaths;
    },
} satisfies Config;
