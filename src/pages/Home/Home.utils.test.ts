import { describe, it, expect, vi } from 'vitest';
import {
    detectOS,
    fetchLatestRelease,
    findDMGAsset,
    findAssetForOS,
    getHomeSeoData,
    getWebSiteSchema,
    getBreadcrumbSchema,
    githubApiUrl,
} from './Home.utils';
import type { GitHubRelease } from '@/types/github.ts';

describe('Home.utils', () => {
    describe('detectOS', () => {
        describe('when user agent is macOS', () => {
            it('returns macos', () => {
                vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' });

                expect(detectOS()).toBe('macos');

                vi.unstubAllGlobals();
            });
        });

        describe('when user agent is Windows', () => {
            it('returns windows', () => {
                vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' });

                expect(detectOS()).toBe('windows');

                vi.unstubAllGlobals();
            });
        });

        describe('when user agent is Linux', () => {
            it('returns linux', () => {
                vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (X11; Linux x86_64)' });

                expect(detectOS()).toBe('linux');

                vi.unstubAllGlobals();
            });
        });

        describe('when user agent is unknown', () => {
            it('returns unknown', () => {
                vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (FreeBSD)' });

                expect(detectOS()).toBe('unknown');

                vi.unstubAllGlobals();
            });
        });

        describe('when navigator is undefined', () => {
            it('returns unknown', () => {
                const originalNavigator = globalThis.navigator;

                // @ts-expect-error - testing undefined navigator
                delete globalThis.navigator;

                expect(detectOS()).toBe('unknown');

                globalThis.navigator = originalNavigator;
            });
        });
    });

    describe('fetchLatestRelease', () => {
        describe('when API call succeeds', () => {
            it('returns release data', async () => {
                const mockRelease = {
                    tag_name: 'v1.0.0',
                    name: 'Release 1.0.0',
                    assets: [],
                };

                global.fetch = vi.fn().mockResolvedValue({
                    ok: true,
                    json: async () => mockRelease,
                });

                const result = await fetchLatestRelease();

                expect(result).toEqual(mockRelease);
                expect(fetch).toHaveBeenCalledWith(githubApiUrl);
            });
        });

        describe('when API call fails', () => {
            it('returns null for network error', async () => {
                global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

                const result = await fetchLatestRelease();

                expect(result).toBeNull();
            });

            it('returns null for non-ok response', async () => {
                global.fetch = vi.fn().mockResolvedValue({
                    ok: false,
                });

                const result = await fetchLatestRelease();

                expect(result).toBeNull();
            });
        });
    });

    describe('findDMGAsset', () => {
        describe('when release has DMG asset', () => {
            it('returns the DMG asset', () => {
                const release: GitHubRelease = {
                    tag_name: 'v1.0.0',
                    name: 'Release',
                    assets: [
                        { name: 'app.exe', browser_download_url: 'http://example.com/app.exe', size: 1000, download_count: 0 },
                        { name: 'app.dmg', browser_download_url: 'http://example.com/app.dmg', size: 2000, download_count: 0 },
                    ],
                    body: '',
                    published_at: '2025-01-01',
                };

                const result = findDMGAsset(release);

                expect(result).toEqual({
                    name: 'app.dmg',
                    browser_download_url: 'http://example.com/app.dmg',
                    size: 2000,
                    download_count: 0,
                });
            });
        });

        describe('when release has no DMG asset', () => {
            it('returns undefined', () => {
                const release: GitHubRelease = {
                    tag_name: 'v1.0.0',
                    name: 'Release',
                    assets: [
                        { name: 'app.exe', browser_download_url: 'http://example.com/app.exe', size: 1000, download_count: 0 },
                    ],
                    body: '',
                    published_at: '2025-01-01',
                };

                const result = findDMGAsset(release);

                expect(result).toBeUndefined();
            });
        });
    });

    describe('findAssetForOS', () => {
        const release: GitHubRelease = {
            tag_name: 'v1.0.0',
            name: 'Release',
            assets: [
                { name: 'app.dmg', browser_download_url: 'http://example.com/app.dmg', size: 2000, download_count: 0 },
                { name: 'app.exe', browser_download_url: 'http://example.com/app.exe', size: 1500, download_count: 0 },
                { name: 'app.AppImage', browser_download_url: 'http://example.com/app.AppImage', size: 1800, download_count: 0 },
            ],
            body: '',
            published_at: '2025-01-01',
        };

        describe('when OS is macos', () => {
            it('returns DMG asset', () => {
                const result = findAssetForOS(release, 'macos');

                expect(result?.name).toBe('app.dmg');
            });
        });

        describe('when OS is windows', () => {
            it('returns EXE asset', () => {
                const result = findAssetForOS(release, 'windows');

                expect(result?.name).toBe('app.exe');
            });
        });

        describe('when OS is linux', () => {
            it('returns AppImage or deb asset', () => {
                const result = findAssetForOS(release, 'linux');

                expect(result?.name).toBe('app.AppImage');
            });
        });

        describe('when OS is unknown', () => {
            it('returns null', () => {
                const result = findAssetForOS(release, 'unknown');

                expect(result).toBeNull();
            });
        });

        describe('when release has no assets', () => {
            it('returns undefined', () => {
                const emptyRelease: GitHubRelease = {
                    tag_name: 'v1.0.0',
                    name: 'Release',
                    assets: [],
                    body: '',
                    published_at: '2025-01-01',
                };

                const result = findAssetForOS(emptyRelease, 'macos');

                // .find() returns undefined when no match is found
                expect(result).toBeUndefined();
            });
        });
    });

    describe('getHomeSeoData', () => {
        describe('when called with description only', () => {
            it('returns structured data with default version', () => {
                const description = 'MoveIt is a mouse jiggler app';

                const result = getHomeSeoData(description);

                expect(result['@context']).toBe('https://schema.org');
                expect(result['@type']).toBe('SoftwareApplication');
                expect(result.name).toBe('MoveIt');
                expect(result.description).toBe(description);
                expect(result.softwareVersion).toBe('1.0.0');
            });

            it('includes feature list', () => {
                const result = getHomeSeoData('Test description');

                expect(result.featureList).toEqual([
                    'Smart Scheduling - Set custom active hours',
                    'Automatic mouse movement',
                    'Wake from sleep support',
                    '11 languages supported',
                    'Zero data collection',
                    'Open-source',
                ]);
            });

            it('includes author information', () => {
                const result = getHomeSeoData('Test description');

                expect(result.author).toEqual({
                    '@type': 'Person',
                    name: 'Nicolae Balica',
                    url: 'https://github.com/NicolaeBP',
                });
            });

            it('includes free offer', () => {
                const result = getHomeSeoData('Test description');

                expect(result.offers).toEqual({
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                });
            });
        });

        describe('when called with release data', () => {
            it('uses version from release tag', () => {
                const release: GitHubRelease = {
                    tag_name: 'v2.5.0',
                    name: 'Release',
                    assets: [],
                    body: '',
                    published_at: '2025-01-01',
                };

                const result = getHomeSeoData('Test description', release);

                expect(result.softwareVersion).toBe('2.5.0');
            });

            it('uses DMG download URL from release', () => {
                const release: GitHubRelease = {
                    tag_name: 'v2.5.0',
                    name: 'Release',
                    assets: [
                        { name: 'app.dmg', browser_download_url: 'https://example.com/app-2.5.0.dmg', size: 2000, download_count: 0 },
                    ],
                    body: '',
                    published_at: '2025-01-01',
                };

                const result = getHomeSeoData('Test description', release);

                expect(result.downloadUrl).toBe('https://example.com/app-2.5.0.dmg');
            });

            it('uses fallback download URL when no DMG asset', () => {
                const release: GitHubRelease = {
                    tag_name: 'v2.5.0',
                    name: 'Release',
                    assets: [],
                    body: '',
                    published_at: '2025-01-01',
                };

                const result = getHomeSeoData('Test description', release);

                expect(result.downloadUrl).toBe('https://github.com/NicolaeBP/MoveIt/releases/latest/download/MoveIt-2.5.0-arm64.dmg');
            });
        });

        describe('when release is null', () => {
            it('uses default version', () => {
                const result = getHomeSeoData('Test description', null);

                expect(result.softwareVersion).toBe('1.0.0');
            });
        });
    });

    describe('getWebSiteSchema', () => {
        it('returns WebSite structured data', () => {
            const result = getWebSiteSchema();

            expect(result['@context']).toBe('https://schema.org');
            expect(result['@type']).toBe('WebSite');
            expect(result.name).toBe('MoveIt');
            expect(result.url).toBe('https://www.moveitapp.io/');
        });
    });

    describe('getBreadcrumbSchema', () => {
        it('returns BreadcrumbList structured data', () => {
            const items = [
                { name: 'Home', url: 'https://www.moveitapp.io/' },
                { name: 'Download', url: 'https://www.moveitapp.io/download' },
            ];

            const result = getBreadcrumbSchema(items);
            const listElements = result.itemListElement as Array<{
                '@type': string;
                position: number;
                name: string;
                item: string;
            }>;

            expect(result['@context']).toBe('https://schema.org');
            expect(result['@type']).toBe('BreadcrumbList');
            expect(listElements).toHaveLength(2);
            expect(listElements[0]).toEqual({
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.moveitapp.io/',
            });
            expect(listElements[1]).toEqual({
                '@type': 'ListItem',
                position: 2,
                name: 'Download',
                item: 'https://www.moveitapp.io/download',
            });
        });

        it('handles single item breadcrumb', () => {
            const items = [{ name: 'Home', url: 'https://www.moveitapp.io/' }];

            const result = getBreadcrumbSchema(items);
            const listElements = result.itemListElement as Array<unknown>;

            expect(listElements).toHaveLength(1);
        });
    });
});
