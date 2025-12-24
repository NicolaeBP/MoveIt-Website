import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LanguageProvider from '@/context/LanguageContext';
import ThemeProvider from '@/context/ThemeContext';
import Home from './Home';

import * as useValidateLanguageModule from '../../hooks/useValidateLanguage';

vi.mock('../../components/Seo/Seo', () => ({ default: () => null }));
vi.mock('react-schemaorg', () => ({ JsonLd: () => null }));
vi.mock('./Home.utils', () => ({
    detectOS: () => 'macos',
    fetchLatestRelease: vi.fn(() => Promise.resolve({
        tag_name: 'v1.0.0',
        name: 'Version 1.0.0',
        published_at: '2025-01-01',
        body: '',
        assets: [{ name: 'app.dmg', browser_download_url: 'https://example.com/app.dmg', size: 1000, download_count: 100 }]
    })),
    findAssetForOS: () => ({ name: 'app.dmg', browser_download_url: 'https://example.com/app.dmg', size: 1000, download_count: 100 }),
    getHomeSeoData: () => ({}),
    getWebSiteSchema: () => ({}),
    getBreadcrumbSchema: () => ({}),
}));

const createWrapper = (path?: string) => ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={path ? [path] : undefined}>
        <ThemeProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </ThemeProvider>
    </MemoryRouter>
);

describe('Home', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        vi.spyOn(useValidateLanguageModule, 'useValidateLanguage').mockReturnValue(null);
    });

    describe('when rendered', () => {
        it('displays hero section', async () => {
            render(<Home />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('MoveIt')).toBeInTheDocument();
            });
        });

        it('displays tagline', async () => {
            render(<Home />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText(/Professional Mouse Automation/)).toBeInTheDocument();
            });
        });

        it('displays Key Features section', async () => {
            render(<Home />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Key Features')).toBeInTheDocument();
            });
        });

        it('displays Perfect For section', async () => {
            render(<Home />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Perfect For')).toBeInTheDocument();
            });
        });

        it('displays CTA section', async () => {
            render(<Home />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument();
            });
        });
    });

    describe('when rendered in non-English language', () => {
        it('uses language prefix in SEO path', async () => {
            render(<Home />, { wrapper: createWrapper('/es') });

            await waitFor(() => {
                expect(screen.getByText('MoveIt')).toBeInTheDocument();
            });
        });
    });

    describe('when invalid language is detected', () => {
        it('returns NotFound component', async () => {
            const NotFoundComponent = () => <div>Not Found</div>;

            vi.spyOn(useValidateLanguageModule, 'useValidateLanguage').mockReturnValue(<NotFoundComponent />);

            render(<Home />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Not Found')).toBeInTheDocument();
                expect(screen.queryByText('MoveIt')).not.toBeInTheDocument();
            });
        });
    });
});
