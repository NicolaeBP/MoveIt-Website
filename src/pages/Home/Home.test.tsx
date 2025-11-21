import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LanguageProvider from '@/context/LanguageContext';
import ThemeProvider from '@/context/ThemeContext';
import Home from './Home';

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
}));
vi.mock('../../hooks/useValidateLanguage', () => ({
    useValidateLanguage: () => null,
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
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
    });

    describe('when rendered', () => {
        it('displays hero section', async () => {
            render(<Home />, { wrapper });

            await waitFor(() => {
                expect(screen.getByText('MoveIt')).toBeInTheDocument();
            });
        });

        it('displays tagline', async () => {
            render(<Home />, { wrapper });

            await waitFor(() => {
                expect(screen.getByText(/Professional Mouse Automation/)).toBeInTheDocument();
            });
        });

        it('displays Key Features section', async () => {
            render(<Home />, { wrapper });

            await waitFor(() => {
                expect(screen.getByText('Key Features')).toBeInTheDocument();
            });
        });

        it('displays Perfect For section', async () => {
            render(<Home />, { wrapper });

            await waitFor(() => {
                expect(screen.getByText('Perfect For')).toBeInTheDocument();
            });
        });

        it('displays CTA section', async () => {
            render(<Home />, { wrapper });

            await waitFor(() => {
                expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument();
            });
        });
    });
});
