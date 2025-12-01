import type { WebPage, WithContext } from 'schema-dts';

export interface DownloadSeoData {
    '@context': string;
    '@type': 'WebPage';
    name: string;
    description: string;
    url: string;
    mainEntity: {
        '@type': 'SoftwareApplication';
        name: string;
        applicationCategory: string;
        operatingSystem: string[];
        downloadUrl: string;
        offers: {
            '@type': 'Offer';
            price: string;
            priceCurrency: string;
        };
    };
}

export const isMobileOrTablet = (): boolean => {
    if (typeof globalThis.navigator === 'undefined') return false;

    const userAgent = globalThis.navigator.userAgent.toLowerCase();

    return /mobile|android|iphone|ipad|ipod|tablet|blackberry|windows phone/.test(userAgent);
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formatFileSize = (bytes: number): string => {
    const mb = bytes / (1024 * 1024);

    return `${mb.toFixed(2)} MB`;
};

export const extractSections = (body: string): Array<{ title: string; content: string }> => {
    if (!body) return [];

    const sectionRegex = /##\s+([^\n]+)\n([\s\S]*?)(?=##|$)/g;

    return Array.from(body.matchAll(sectionRegex))
        .reduce((acc, match) => {
            const title = match[1].trim();
            const content = match[2].trim();

            return content ? [...acc, { title, content }] : acc;
        }, [] as Array<{ title: string; content: string }>);
};

export const getDownloadSeoData = (description: string): DownloadSeoData & WithContext<WebPage> => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Download MoveIt',
    description,
    url: 'https://www.moveitapp.io/download',
    mainEntity: {
        '@type': 'SoftwareApplication',
        name: 'MoveIt',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: ['macOS', 'Windows', 'Linux'],
        downloadUrl: 'https://github.com/NicolaeBP/MoveIt/releases/latest',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    },
});
