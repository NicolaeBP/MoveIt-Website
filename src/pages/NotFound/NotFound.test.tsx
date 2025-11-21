import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LanguageProvider from '@/context/LanguageContext';
import ThemeProvider from '@/context/ThemeContext';
import NotFound from './NotFound';

vi.mock('../../components/Seo/Seo', () => ({
    default: () => null,
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

describe('NotFound', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('when rendered', () => {
        it('displays 404 number', () => {
            render(<NotFound />, { wrapper: createWrapper() });

            expect(screen.getByText('404')).toBeInTheDocument();
        });

        it('displays page not found heading', () => {
            render(<NotFound />, { wrapper: createWrapper() });

            expect(screen.getByText('Page Not Found')).toBeInTheDocument();
        });

        it('displays error message', () => {
            render(<NotFound />, { wrapper: createWrapper() });

            expect(screen.getByText(/doesn't exist or has been moved/)).toBeInTheDocument();
        });
    });

    describe('when navigation links are displayed', () => {
        it('displays Home link', () => {
            render(<NotFound />, { wrapper: createWrapper() });

            const homeLinks = screen.getAllByRole('link', { name: /Home/ });

            expect(homeLinks.length).toBeGreaterThanOrEqual(1);
        });

        it('displays Download link', () => {
            render(<NotFound />, { wrapper: createWrapper() });

            expect(screen.getByRole('link', { name: /Download/ })).toBeInTheDocument();
        });

        it('displays Contact link', () => {
            render(<NotFound />, { wrapper: createWrapper() });

            expect(screen.getByRole('link', { name: /Contact/ })).toBeInTheDocument();
        });

        it('displays Back to Home button', () => {
            render(<NotFound />, { wrapper: createWrapper() });

            expect(screen.getByRole('link', { name: 'Back to Home' })).toBeInTheDocument();
        });
    });

    describe('when link paths are set', () => {
        it('Home link points to root', () => {
            render(<NotFound />, { wrapper: createWrapper() });

            const homeLinks = screen.getAllByRole('link', { name: /Home/ });

            expect(homeLinks[0]).toHaveAttribute('href', '/');
        });

        it('Download link points to download page', () => {
            render(<NotFound />, { wrapper: createWrapper() });

            const downloadLink = screen.getByRole('link', { name: /Download/ });

            expect(downloadLink).toHaveAttribute('href', '/download');
        });

        it('Contact link points to contact page', () => {
            render(<NotFound />, { wrapper: createWrapper() });

            const contactLink = screen.getByRole('link', { name: /Contact/ });

            expect(contactLink).toHaveAttribute('href', '/contact');
        });
    });

    describe('when language is not English', () => {
        it('includes language prefix in paths', () => {
            render(<NotFound />, { wrapper: createWrapper('/es/404') });

            const homeLinks = screen.getAllByRole('link', { name: /Inicio/ });
            const downloadLink = screen.getByRole('link', { name: /Descargar/ });
            const contactLink = screen.getByRole('link', { name: /Contacto/ });

            expect(homeLinks[0]).toHaveAttribute('href', '/es');
            expect(downloadLink).toHaveAttribute('href', '/es/download');
            expect(contactLink).toHaveAttribute('href', '/es/contact');
        });
    });

    describe('when icons are displayed', () => {
        it('renders Home icon', () => {
            const { container } = render(<NotFound />, { wrapper: createWrapper() });

            const icons = container.querySelectorAll('svg');

            expect(icons.length).toBeGreaterThanOrEqual(3);
        });
    });
});
