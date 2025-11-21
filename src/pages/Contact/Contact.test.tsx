import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LanguageProvider from '@/context/LanguageContext';
import ThemeProvider from '@/context/ThemeContext';
import Contact from './Contact';

import * as useValidateLanguageModule from '../../hooks/useValidateLanguage';

vi.mock('../../components/Seo/Seo', () => ({ default: () => null }));
vi.mock('react-schemaorg', () => ({ JsonLd: () => null }));
vi.mock('./Contact.utils', () => ({
    getContactSeoData: () => ({}),
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

describe('Contact', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        vi.spyOn(useValidateLanguageModule, 'useValidateLanguage').mockReturnValue(null);
    });

    describe('when rendered in English', () => {
        it('displays hero section', async () => {
            render(<Contact />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Get in Touch')).toBeInTheDocument();
            });
        });

        it('displays developer name', async () => {
            render(<Contact />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Nicolae Balica')).toBeInTheDocument();
            });
        });

        it('displays contact methods', async () => {
            render(<Contact />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Email')).toBeInTheDocument();
                expect(screen.getByText('GitHub')).toBeInTheDocument();
            });
        });

        it('displays support section', async () => {
            render(<Contact />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Support & Resources')).toBeInTheDocument();
            });
        });

        it('displays contributing section', async () => {
            render(<Contact />, { wrapper: createWrapper() });

            await waitFor(() => {
                expect(screen.getByText('Want to Contribute?')).toBeInTheDocument();
            });
        });
    });

    describe('when rendered in non-English language', () => {
        it('uses language prefix in SEO path', async () => {
            render(<Contact />, { wrapper: createWrapper('/es/contact') });

            await waitFor(() => {
                expect(screen.getByText('Ponte en Contacto')).toBeInTheDocument();
            });
        });
    });

    describe('when invalid language is detected', () => {
        it('returns NotFound component', () => {
            const NotFoundComponent = () => <div>Not Found</div>;

            vi.spyOn(useValidateLanguageModule, 'useValidateLanguage').mockReturnValue(<NotFoundComponent />);

            render(<Contact />, { wrapper: createWrapper() });

            expect(screen.getByText('Not Found')).toBeInTheDocument();
            expect(screen.queryByText('Get in Touch')).not.toBeInTheDocument();
        });
    });
});
