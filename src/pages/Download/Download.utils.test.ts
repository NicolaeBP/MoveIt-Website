import { describe, it, expect, vi } from 'vitest';
import {
    isMobileOrTablet,
    formatDate,
    formatFileSize,
    extractSections,
    getDownloadSeoData,
    type DownloadSeoData,
} from './Download.utils';

describe('Download.utils', () => {
    describe('isMobileOrTablet', () => {
        describe('when user agent is mobile', () => {
            it('returns true for iPhone', () => {
                vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)' });

                expect(isMobileOrTablet()).toBe(true);

                vi.unstubAllGlobals();
            });

            it('returns true for iPad', () => {
                vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)' });

                expect(isMobileOrTablet()).toBe(true);

                vi.unstubAllGlobals();
            });

            it('returns true for Android', () => {
                vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Linux; Android 10)' });

                expect(isMobileOrTablet()).toBe(true);

                vi.unstubAllGlobals();
            });
        });

        describe('when user agent is desktop', () => {
            it('returns false for macOS', () => {
                vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' });

                expect(isMobileOrTablet()).toBe(false);

                vi.unstubAllGlobals();
            });

            it('returns false for Windows', () => {
                vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' });

                expect(isMobileOrTablet()).toBe(false);

                vi.unstubAllGlobals();
            });
        });

        describe('when navigator is undefined', () => {
            it('returns false', () => {
                const originalNavigator = globalThis.navigator;

                // @ts-expect-error - testing undefined navigator
                delete globalThis.navigator;

                expect(isMobileOrTablet()).toBe(false);

                globalThis.navigator = originalNavigator;
            });
        });
    });

    describe('formatDate', () => {
        describe('when given a valid date string', () => {
            it('formats date in long format', () => {
                const result = formatDate('2025-01-15');

                expect(result).toBe('January 15, 2025');
            });

            it('formats date with different month', () => {
                const result = formatDate('2024-12-25');

                expect(result).toBe('December 25, 2024');
            });
        });
    });

    describe('formatFileSize', () => {
        describe('when given bytes', () => {
            it('converts to MB with 2 decimal places', () => {
                const bytes = 5 * 1024 * 1024; // 5 MB

                const result = formatFileSize(bytes);

                expect(result).toBe('5.00 MB');
            });

            it('handles fractional MB values', () => {
                const bytes = 1024 * 1024 + 512 * 1024; // 1.5 MB

                const result = formatFileSize(bytes);

                expect(result).toBe('1.50 MB');
            });

            it('handles small byte values', () => {
                const bytes = 100 * 1024; // 0.09765625 MB

                const result = formatFileSize(bytes);

                expect(result).toBe('0.10 MB');
            });
        });
    });

    describe('extractSections', () => {
        describe('when body contains markdown sections', () => {
            it('extracts sections with titles and content', () => {
                const body = `## Section 1\nContent for section 1\n## Section 2\nContent for section 2`;

                const result = extractSections(body);

                expect(result).toEqual([
                    { title: 'Section 1', content: 'Content for section 1' },
                    { title: 'Section 2', content: 'Content for section 2' },
                ]);
            });

            it('ignores sections with no content', () => {
                const body = `## Section 1\nContent here\n## Section 2\n## Section 3\nMore content`;

                const result = extractSections(body);

                expect(result).toEqual([
                    { title: 'Section 1', content: 'Content here' },
                    { title: 'Section 3', content: 'More content' },
                ]);
            });

            it('handles multiline content', () => {
                const body = `## Section 1\nLine 1\nLine 2\nLine 3`;

                const result = extractSections(body);

                expect(result).toEqual([
                    { title: 'Section 1', content: 'Line 1\nLine 2\nLine 3' },
                ]);
            });
        });

        describe('when body is empty', () => {
            it('returns empty array', () => {
                const result = extractSections('');

                expect(result).toEqual([]);
            });
        });

        describe('when body has no sections', () => {
            it('returns empty array', () => {
                const body = 'Just some text without sections';

                const result = extractSections(body);

                expect(result).toEqual([]);
            });
        });
    });

    describe('getDownloadSeoData', () => {
        describe('when called with description', () => {
            it('returns structured data with correct schema', () => {
                const description = 'Download MoveIt for your platform';

                const result = getDownloadSeoData(description);

                expect(result['@context']).toBe('https://schema.org');
                expect(result['@type']).toBe('WebPage');
                expect(result.name).toBe('Download MoveIt');
                expect(result.description).toBe(description);
            });

            it('includes software application data', () => {
                const result: DownloadSeoData = getDownloadSeoData('Test description');
                const mainEntity = result.mainEntity;

                expect(mainEntity).toBeDefined();
                expect(mainEntity['@type']).toBe('SoftwareApplication');
                expect(mainEntity.name).toBe('MoveIt');
            });

            it('includes free offer data', () => {
                const result: DownloadSeoData = getDownloadSeoData('Test description');
                const offers = result.mainEntity.offers;

                expect(offers).toBeDefined();
                expect(offers.price).toBe('0');
                expect(offers.priceCurrency).toBe('USD');
            });
        });
    });
});
