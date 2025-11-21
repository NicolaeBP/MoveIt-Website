import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LanguageProvider from '@/context/LanguageContext';
import ThemeProvider from '@/context/ThemeContext';
import Download from './Download';

vi.mock('../../components/Seo/Seo', () => ({ default: () => null }));
vi.mock('react-schemaorg', () => ({ JsonLd: () => null }));
vi.mock('./Download.utils', () => ({
    isMobileOrTablet: () => false,
    getDownloadSeoData: () => ({}),
}));
vi.mock('../../hooks/useValidateLanguage', () => ({
    useValidateLanguage: () => null,
}));

global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
    })
) as unknown as typeof fetch;

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
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
    });

    describe('when rendered on desktop', () => {
        it('displays hero section', async () => {
            render(<Download />, { wrapper });

            await waitFor(() => {
                expect(screen.getByText('Download MoveIt')).toBeInTheDocument();
            });
        });

        it('displays Mac App Store section', async () => {
            render(<Download />, { wrapper });

            await waitFor(() => {
                expect(screen.getByText('Mac App Store')).toBeInTheDocument();
            });
        });

        it('displays Direct Download section', async () => {
            render(<Download />, { wrapper });

            await waitFor(() => {
                expect(screen.getByText('Direct Download')).toBeInTheDocument();
            });
        });

        it('displays Installation Instructions', async () => {
            render(<Download />, { wrapper });

            await waitFor(() => {
                expect(screen.getByText('Installation Instructions')).toBeInTheDocument();
            });
        });
    });
});
