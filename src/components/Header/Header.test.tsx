import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import LanguageProvider from '@/context/LanguageContext';
import ThemeProvider from '@/context/ThemeContext';
import Header from './Header';

vi.mock('../Settings/Settings', () => ({
    default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
        isOpen ? (
            <div data-testid="settings-modal">
                <button onClick={onClose}>Close Settings</button>
            </div>
        ) : null
    ),
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

describe('Header', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('when rendered', () => {
        it('displays brand name', () => {
            render(<Header />, { wrapper: createWrapper() });

            expect(screen.getByText('MoveIt')).toBeInTheDocument();
        });

        it('displays all navigation links', () => {
            render(<Header />, { wrapper: createWrapper() });

            expect(screen.getByText('Home')).toBeInTheDocument();
            expect(screen.getByText('Download')).toBeInTheDocument();
            expect(screen.getByText('Contact')).toBeInTheDocument();
        });

        it('displays settings button with accessible label', () => {
            render(<Header />, { wrapper: createWrapper() });

            const settingsButton = screen.getByRole('button', { name: 'Settings' });
            expect(settingsButton).toBeInTheDocument();
        });

        it('has correct ARIA attributes on settings button', () => {
            render(<Header />, { wrapper: createWrapper() });

            const settingsButton = screen.getByRole('button', { name: 'Settings' });
            expect(settingsButton).toHaveAttribute('aria-haspopup', 'true');
            expect(settingsButton).toHaveAttribute('aria-expanded', 'false');
        });
    });

    describe('when brand name is clicked', () => {
        it('links to home page', () => {
            render(<Header />, { wrapper: createWrapper() });

            const brandLink = screen.getByText('MoveIt').closest('a');
            expect(brandLink).toHaveAttribute('href', '/');
        });

        it('links to localized home page for non-English language', () => {
            render(<Header />, { wrapper: createWrapper('/ro') });

            const brandLink = screen.getByText('MoveIt').closest('a');
            expect(brandLink).toHaveAttribute('href', '/ro/');
        });
    });

    describe('when navigation links are present', () => {
        it('home link points to correct path', () => {
            render(<Header />, { wrapper: createWrapper() });

            const homeLink = screen.getByText('Home').closest('a');
            expect(homeLink).toHaveAttribute('href', '/');
        });

        it('download link points to correct path', () => {
            render(<Header />, { wrapper: createWrapper() });

            const downloadLink = screen.getByText('Download').closest('a');
            expect(downloadLink).toHaveAttribute('href', '/download');
        });

        it('contact link points to correct path', () => {
            render(<Header />, { wrapper: createWrapper() });

            const contactLink = screen.getByText('Contact').closest('a');
            expect(contactLink).toHaveAttribute('href', '/contact');
        });

        it('localizes paths for Romanian language', () => {
            render(<Header />, { wrapper: createWrapper('/ro') });

            // Romanian translations: "Acasă", "Descărcare", "Contact"
            const homeLink = screen.getByText('Acasă').closest('a');
            const downloadLink = screen.getByText('Descărcare').closest('a');
            const contactLink = screen.getByText('Contact').closest('a');

            expect(homeLink).toHaveAttribute('href', '/ro/');
            expect(downloadLink).toHaveAttribute('href', '/ro/download');
            expect(contactLink).toHaveAttribute('href', '/ro/contact');
        });

        it('localizes paths for Spanish language', () => {
            render(<Header />, { wrapper: createWrapper('/es') });

            // Spanish translation: "Inicio"
            const homeLink = screen.getByText('Inicio').closest('a');
            expect(homeLink).toHaveAttribute('href', '/es/');
        });
    });

    describe('when settings button is clicked', () => {
        it('opens settings modal', async () => {
            const user = userEvent.setup();
            render(<Header />, { wrapper: createWrapper() });

            const settingsButton = screen.getByRole('button', { name: 'Settings' });
            await user.click(settingsButton);

            expect(screen.getByTestId('settings-modal')).toBeInTheDocument();
        });

        it('updates aria-expanded attribute when opened', async () => {
            const user = userEvent.setup();
            render(<Header />, { wrapper: createWrapper() });

            const settingsButton = screen.getByRole('button', { name: 'Settings' });
            await user.click(settingsButton);

            expect(settingsButton).toHaveAttribute('aria-expanded', 'true');
        });

        it('closes settings modal when toggled again', async () => {
            const user = userEvent.setup();
            render(<Header />, { wrapper: createWrapper() });

            const settingsButton = screen.getByRole('button', { name: 'Settings' });

            // Open settings
            await user.click(settingsButton);
            expect(screen.getByTestId('settings-modal')).toBeInTheDocument();

            // Close settings
            await user.click(settingsButton);
            expect(screen.queryByTestId('settings-modal')).not.toBeInTheDocument();
        });
    });

    describe('when settings modal is open', () => {
        it('closes when onClose is called', async () => {
            const user = userEvent.setup();
            render(<Header />, { wrapper: createWrapper() });

            const settingsButton = screen.getByRole('button', { name: 'Settings' });
            await user.click(settingsButton);

            const closeButton = screen.getByText('Close Settings');
            await user.click(closeButton);

            expect(screen.queryByTestId('settings-modal')).not.toBeInTheDocument();
        });

        it('updates aria-expanded attribute when closed', async () => {
            const user = userEvent.setup();
            render(<Header />, { wrapper: createWrapper() });

            const settingsButton = screen.getByRole('button', { name: 'Settings' });
            await user.click(settingsButton);

            const closeButton = screen.getByText('Close Settings');
            await user.click(closeButton);

            expect(settingsButton).toHaveAttribute('aria-expanded', 'false');
        });
    });

    describe('when language changes', () => {
        it('displays navigation items in Romanian', () => {
            render(<Header />, { wrapper: createWrapper('/ro') });

            // Romanian translations
            expect(screen.getByText('Acasă')).toBeInTheDocument();
            expect(screen.getByText('Descărcare')).toBeInTheDocument();
            expect(screen.getByText('Contact')).toBeInTheDocument();
        });

        it('displays navigation items in Spanish', () => {
            render(<Header />, { wrapper: createWrapper('/es') });

            // Spanish translations
            expect(screen.getByText('Inicio')).toBeInTheDocument();
            expect(screen.getByText('Descargar')).toBeInTheDocument();
            expect(screen.getByText('Contacto')).toBeInTheDocument();
        });
    });

    describe('when event propagation is tested', () => {
        it('stops propagation when settings button is clicked', async () => {
            const user = userEvent.setup();
            const parentClickHandler = vi.fn();

            render(
                <div onClick={parentClickHandler}>
                    <Header />
                </div>,
                { wrapper: createWrapper() }
            );

            const settingsButton = screen.getByRole('button', { name: 'Settings' });
            await user.click(settingsButton);

            // Parent handler should not be called due to stopPropagation
            expect(parentClickHandler).not.toHaveBeenCalled();
            expect(screen.getByTestId('settings-modal')).toBeInTheDocument();
        });
    });
});
