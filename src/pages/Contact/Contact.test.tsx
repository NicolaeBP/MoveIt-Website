import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LanguageProvider from '@/context/LanguageContext';
import ThemeProvider from '@/context/ThemeContext';
import Contact from './Contact';

vi.mock('../../components/Seo/Seo', () => ({ default: () => null }));
vi.mock('react-schemaorg', () => ({ JsonLd: () => null }));
vi.mock('./Contact.utils', () => ({
    getContactSeoData: () => ({}),
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

describe('Contact', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    describe('when rendered', () => {
        it('displays hero section', async () => {
            render(<Contact />, { wrapper });

            await waitFor(() => {
                expect(screen.getByText('Get in Touch')).toBeInTheDocument();
            });
        });

        it('displays developer name', async () => {
            render(<Contact />, { wrapper });

            await waitFor(() => {
                expect(screen.getByText('Nicolae Balica')).toBeInTheDocument();
            });
        });

        it('displays contact methods', async () => {
            render(<Contact />, { wrapper });

            await waitFor(() => {
                expect(screen.getByText('Email')).toBeInTheDocument();
                expect(screen.getByText('GitHub')).toBeInTheDocument();
            });
        });

        it('displays support section', async () => {
            render(<Contact />, { wrapper });

            await waitFor(() => {
                expect(screen.getByText('Support & Resources')).toBeInTheDocument();
            });
        });

        it('displays contributing section', async () => {
            render(<Contact />, { wrapper });

            await waitFor(() => {
                expect(screen.getByText('Want to Contribute?')).toBeInTheDocument();
            });
        });
    });
});
