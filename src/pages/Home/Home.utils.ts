import type { GitHubRelease } from '../../types/github';
import type { SoftwareApplication, WithContext } from 'schema-dts';

export const githubApiUrl = 'https://api.github.com/repos/NicolaeBP/MoveIt/releases/latest';

export const detectOS = (): 'macos' | 'windows' | 'linux' | 'unknown' => {
    if (typeof globalThis.navigator === 'undefined') return 'unknown';

    const userAgent = globalThis.navigator.userAgent.toLowerCase();

    if (userAgent.includes('mac')) return 'macos';

    if (userAgent.includes('win')) return 'windows';

    if (userAgent.includes('linux')) return 'linux';

    return 'unknown';
};

export const fetchLatestRelease = async (): Promise<GitHubRelease | null> => {
    try {
        const response = await fetch(githubApiUrl);

        if (!response.ok) return null;

        return await response.json();
    } catch {
        return null;
    }
};

export const findDMGAsset = (release: GitHubRelease) => {
    return release?.assets?.find((asset) => asset.name.endsWith('.dmg'));
};

export const findAssetForOS = (release: GitHubRelease, os: ReturnType<typeof detectOS>) => {
    if (!release?.assets) return null;

    switch (os) {
        case 'macos':
            return release.assets.find((asset) => asset.name.endsWith('.dmg'));
        case 'windows':
            return release.assets.find((asset) => asset.name.endsWith('.exe'));
        case 'linux':
            return release.assets.find((asset) => asset.name.endsWith('.AppImage') || asset.name.endsWith('.deb'));
        default:
            return null;
    }
};

export const getHomeSeoData = (description: string, release?: GitHubRelease | null): WithContext<SoftwareApplication> => {
    const version = release?.tag_name?.replace('v', '') || '1.0.0';
    const dmgAsset = release ? findDMGAsset(release) : null;

    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'MoveIt',
        alternateName: 'MoveIt Mouse Jiggler',
        description,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: ['macOS', 'Windows', 'Linux'],
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        author: {
            '@type': 'Person',
            name: 'Nicolae Balica',
            url: 'https://github.com/NicolaeBP',
        },
        featureList: [
            'Smart Scheduling - Set custom active hours',
            'Automatic mouse movement',
            'Wake from sleep support',
            '11 languages supported',
            'Zero data collection',
            'Open-source',
        ],
        screenshot: 'https://nicolaebp.github.io/MoveIt-Website/images/screenshot.png',
        softwareVersion: version,
        downloadUrl: dmgAsset?.browser_download_url || `https://github.com/NicolaeBP/MoveIt/releases/latest/download/MoveIt-${version}-arm64.dmg`,
        installUrl: 'https://nicolaebp.github.io/MoveIt-Website/',
        releaseNotes: 'https://github.com/NicolaeBP/MoveIt/releases',
    };
};
