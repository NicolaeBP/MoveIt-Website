import React from 'react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LanguageProvider from '@/context/LanguageContext';
import ThemeProvider from '@/context/ThemeContext';
import Download from './Download';
import * as DownloadUtils from './Download.utils';
import * as useValidateLanguageModule from '../../hooks/useValidateLanguage';

vi.mock('../../components/Seo/Seo', () => ({ default: () => null }));
vi.mock('react-schemaorg', () => ({ JsonLd: () => null }));

const createWrapper = (path?: string) => ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={path ? [path] : undefined}>
        <ThemeProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </ThemeProvider>
    </MemoryRouter>
);

describe('Download', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();

        Object.defineProperty(globalThis, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation((query: string) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([]),
            })
        ) as unknown as typeof fetch;

        vi.spyOn(useValidateLanguageModule, 'useValidateLanguage').mockReturnValue(null);
        vi.spyOn(DownloadUtils, 'isMobileOrTablet').mockReturnValue(false);
        vi.spyOn(DownloadUtils, 'getDownloadSeoData').mockReturnValue({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'MoveIt',
            description: 'Test',
            url: 'https://test.com',
            mainEntity: {
                '@type': 'SoftwareApplication',
                name: 'MoveIt',
                applicationCategory: 'Utilities',
                operatingSystem: ['macOS'],
                downloadUrl: 'https://test.com',
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                },
            },
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('when rendered on desktop', () => {
        it('displays hero section', async () => {
            render(<Download />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Download MoveIt')).toBeInTheDocument();
            });
        });

        it('displays Mac App Store section', async () => {
            render(<Download />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Mac App Store')).toBeInTheDocument();
            });
        });

        it('displays Direct Download section', async () => {
            render(<Download />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Direct Download')).toBeInTheDocument();
            });
        });

        it('displays Installation Instructions', async () => {
            render(<Download />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Installation Instructions')).toBeInTheDocument();
            });
        });
    });

    describe('when rendered on mobile or tablet', () => {
        it('displays desktop-only message', async () => {
            vi.spyOn(DownloadUtils, 'isMobileOrTablet').mockReturnValue(true);

            render(<Download />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Desktop App Only')).toBeInTheDocument();
                expect(screen.getByText(/MoveIt is a desktop application available for/i)).toBeInTheDocument();
            });
        });

        it('does not display Mac App Store section on mobile', async () => {
            vi.spyOn(DownloadUtils, 'isMobileOrTablet').mockReturnValue(true);

            render(<Download />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.queryByText('Mac App Store')).not.toBeInTheDocument();
            });
        });
    });

    describe('when fetch fails with non-ok response', () => {
        it('passes error to DirectDownloadSection', async () => {
            global.fetch = vi.fn(() =>
                Promise.resolve({
                    ok: false,
                    json: () => Promise.resolve([]),
                })
            ) as unknown as typeof fetch;

            render(<Download />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Failed to load releases')).toBeInTheDocument();
            });
        });
    });

    describe('when fetch throws Error', () => {
        it('handles Error instance gracefully', async () => {
            const errorMessage = 'Network connection failed';
            global.fetch = vi.fn(() =>
                Promise.reject(new Error(errorMessage))
            ) as unknown as typeof fetch;

            render(<Download />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Failed to load releases')).toBeInTheDocument();
            });
        });
    });

    describe('when fetch throws non-Error exception', () => {
        it('handles non-Error with fallback message', async () => {
            global.fetch = vi.fn(() =>
                Promise.reject('Network failure string')
            ) as unknown as typeof fetch;

            render(<Download />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Failed to load releases')).toBeInTheDocument();
            });
        });
    });

    describe('when fetch succeeds with releases', () => {
        it('passes releases to DirectDownloadSection', async () => {
            const mockReleases = [
                {
                    tag_name: 'v1.0.0',
                    name: 'Version 1.0.0',
                    body: 'Release notes',
                    published_at: '2025-01-01',
                    assets: [],
                },
            ];

            global.fetch = vi.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockReleases),
                })
            ) as unknown as typeof fetch;

            render(<Download />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Direct Download')).toBeInTheDocument();
            });
        });
    });

    describe('when invalid language is detected', () => {
        it('returns NotFound component', async () => {
            const NotFoundComponent = () => <div>Not Found</div>;

            vi.spyOn(useValidateLanguageModule, 'useValidateLanguage').mockReturnValue(<NotFoundComponent />);

            render(<Download />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Not Found')).toBeInTheDocument();
                expect(screen.queryByText('Download MoveIt')).not.toBeInTheDocument();
            });
        });
    });

    describe('when rendered in non-English language', () => {
        it('uses language prefix in SEO path on desktop', async () => {
            render(<Download />, { wrapper: createWrapper('/es/download') });

            await waitFor(() => {
                expect(screen.getByText('Descargar MoveIt')).toBeInTheDocument();
            });
        });

        it('uses language prefix in SEO path on mobile', async () => {
            vi.spyOn(DownloadUtils, 'isMobileOrTablet').mockReturnValue(true);

            render(<Download />, { wrapper: createWrapper('/es/download') });

            await waitFor(() => {
                expect(screen.getByText('Solo Aplicación de Escritorio')).toBeInTheDocument();
            });
        });
    });
});
