import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LanguageProvider from '@/context/LanguageContext';
import ThemeProvider from '@/context/ThemeContext';
import Footer from './Footer';

const createWrapper = (path?: string) => ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={path ? [path] : undefined}>
        <ThemeProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </ThemeProvider>
    </MemoryRouter>
);

describe('Footer', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2025-01-15T12:00:00Z'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    describe('when rendered', () => {
        it('displays brand name', () => {
            render(<Footer />, { wrapper: createWrapper() });

            expect(screen.getByText('MoveIt')).toBeInTheDocument();
        });

        it('displays brand description', () => {
            render(<Footer />, { wrapper: createWrapper() });

            expect(screen.getByText(/Professional mouse automation/i)).toBeInTheDocument();
        });

        it('displays Quick Links heading', () => {
            render(<Footer />, { wrapper: createWrapper() });

            expect(screen.getByText('Quick Links')).toBeInTheDocument();
        });

        it('displays Legal heading', () => {
            render(<Footer />, { wrapper: createWrapper() });

            expect(screen.getByText('Legal')).toBeInTheDocument();
        });

        it('displays copyright with current year', () => {
            render(<Footer />, { wrapper: createWrapper() });

            expect(screen.getByText(/© 2025 Nicolae Balica/i)).toBeInTheDocument();
        });
    });

    describe('when Quick Links section is present', () => {
        it('displays Home link', () => {
            render(<Footer />, { wrapper: createWrapper() });

            const homeLink = screen.getByRole('link', { name: 'Home' });

            expect(homeLink).toBeInTheDocument();
            expect(homeLink).toHaveAttribute('href', '/');
        });

        it('displays Download link', () => {
            render(<Footer />, { wrapper: createWrapper() });

            const downloadLink = screen.getByRole('link', { name: 'Download' });

            expect(downloadLink).toBeInTheDocument();
            expect(downloadLink).toHaveAttribute('href', '/download');
        });

        it('displays Contact link', () => {
            render(<Footer />, { wrapper: createWrapper() });

            const contactLink = screen.getByRole('link', { name: 'Contact' });

            expect(contactLink).toBeInTheDocument();
            expect(contactLink).toHaveAttribute('href', '/contact');
        });
    });

    describe('when language is Romanian', () => {
        it('localizes Home link path', () => {
            render(<Footer />, { wrapper: createWrapper('/ro') });

            const homeLink = screen.getByRole('link', { name: 'Acasă' });

            expect(homeLink).toHaveAttribute('href', '/ro');
        });

        it('localizes Download link path', () => {
            render(<Footer />, { wrapper: createWrapper('/ro') });

            const downloadLink = screen.getByRole('link', { name: 'Descărcare' });

            expect(downloadLink).toHaveAttribute('href', '/ro/download');
        });

        it('localizes Contact link path', () => {
            render(<Footer />, { wrapper: createWrapper('/ro') });

            const contactLink = screen.getByRole('link', { name: 'Contact' });

            expect(contactLink).toHaveAttribute('href', '/ro/contact');
        });
    });

    describe('when language is Spanish', () => {
        it('localizes Home link path', () => {
            render(<Footer />, { wrapper: createWrapper('/es') });

            const homeLink = screen.getByRole('link', { name: 'Inicio' });

            expect(homeLink).toHaveAttribute('href', '/es');
        });

        it('localizes Download link path', () => {
            render(<Footer />, { wrapper: createWrapper('/es') });

            const downloadLink = screen.getByRole('link', { name: 'Descargar' });

            expect(downloadLink).toHaveAttribute('href', '/es/download');
        });

        it('localizes Contact link path', () => {
            render(<Footer />, { wrapper: createWrapper('/es') });

            const contactLink = screen.getByRole('link', { name: 'Contacto' });

            expect(contactLink).toHaveAttribute('href', '/es/contact');
        });
    });

    describe('when language is French', () => {
        it('localizes all links correctly', () => {
            render(<Footer />, { wrapper: createWrapper('/fr') });

            // French translations
            const homeLink = screen.getByRole('link', { name: 'Accueil' });
            const downloadLink = screen.getByRole('link', { name: 'Télécharger' });
            const contactLink = screen.getByRole('link', { name: 'Contact' });

            expect(homeLink).toHaveAttribute('href', '/fr');
            expect(downloadLink).toHaveAttribute('href', '/fr/download');
            expect(contactLink).toHaveAttribute('href', '/fr/contact');
        });
    });

    describe('when Legal section is present', () => {
        it('displays Privacy Policy link', () => {
            render(<Footer />, { wrapper: createWrapper() });

            const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });
            expect(privacyLink).toBeInTheDocument();
        });

        it('Privacy Policy link opens in new tab', () => {
            render(<Footer />, { wrapper: createWrapper() });

            const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });

            expect(privacyLink).toHaveAttribute('target', '_blank');
        });

        it('Privacy Policy link has correct security attributes', () => {
            render(<Footer />, { wrapper: createWrapper() });

            const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });

            expect(privacyLink).toHaveAttribute('rel', 'noopener noreferrer');
        });

        it('Privacy Policy link points to correct URL', () => {
            render(<Footer />, { wrapper: createWrapper() });

            const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });

            expect(privacyLink).toHaveAttribute('href', 'https://www.moveitapp.io/PRIVACY_POLICY');
        });
    });

    describe('when copyright section is present', () => {
        it('displays correct year dynamically', () => {
            render(<Footer />, { wrapper: createWrapper() });

            expect(screen.getByText(/© 2025 Nicolae Balica/i)).toBeInTheDocument();
        });

        it('displays All rights reserved text', () => {
            render(<Footer />, { wrapper: createWrapper() });

            expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
        });
    });

    describe('when rendered with different years', () => {
        it('updates year correctly for 2026', () => {
            vi.setSystemTime(new Date('2026-06-15T12:00:00Z'));

            render(<Footer />, { wrapper: createWrapper() });

            expect(screen.getByText(/© 2026 Nicolae Balica/i)).toBeInTheDocument();
        });

        it('updates year correctly for future year', () => {
            vi.setSystemTime(new Date('2027-12-31T23:59:59Z'));

            render(<Footer />, { wrapper: createWrapper() });

            expect(screen.getByText(/© \d{4} Nicolae Balica/i)).toBeInTheDocument();
        });
    });
});
