import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LanguageProvider from '@/context/LanguageContext';
import ThemeProvider from '@/context/ThemeContext';
import ThemedImage from './ThemedImage';

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
        <ThemeProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </ThemeProvider>
    </MemoryRouter>
);

describe('ThemedImage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('when theme is light', () => {
        it('displays light image source', () => {
            localStorage.setItem('theme', 'light');

            render(
                <ThemedImage
                    lightSrc="/images/light-mode.png"
                    darkSrc="/images/dark-mode.png"
                    alt="Test image"
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('src', '/images/light-mode.png');
        });

        it('displays alt text correctly', () => {
            localStorage.setItem('theme', 'light');

            render(
                <ThemedImage
                    lightSrc="/images/light-mode.png"
                    darkSrc="/images/dark-mode.png"
                    alt="Test image"
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('alt', 'Test image');
        });
    });

    describe('when theme is dark', () => {
        it('displays dark image source', () => {
            localStorage.setItem('theme', 'dark');

            render(
                <ThemedImage
                    lightSrc="/images/light-mode.png"
                    darkSrc="/images/dark-mode.png"
                    alt="Test image"
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('src', '/images/dark-mode.png');
        });

        it('displays alt text correctly', () => {
            localStorage.setItem('theme', 'dark');

            render(
                <ThemedImage
                    lightSrc="/images/light-mode.png"
                    darkSrc="/images/dark-mode.png"
                    alt="Dark mode test"
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('alt', 'Dark mode test');
        });
    });

    describe('when theme is auto (defaults to light)', () => {
        it('displays light image source', () => {
            render(
                <ThemedImage
                    lightSrc="/images/light-mode.png"
                    darkSrc="/images/dark-mode.png"
                    alt="Auto theme image"
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('src', '/images/light-mode.png');
        });
    });

    describe('when additional props are passed', () => {
        it('forwards className prop', () => {
            localStorage.setItem('theme', 'light');

            render(
                <ThemedImage
                    lightSrc="/images/light-mode.png"
                    darkSrc="/images/dark-mode.png"
                    alt="Test image"
                    className="custom-class"
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveClass('custom-class');
        });

        it('forwards width prop', () => {
            localStorage.setItem('theme', 'light');

            render(
                <ThemedImage
                    lightSrc="/images/light-mode.png"
                    darkSrc="/images/dark-mode.png"
                    alt="Test image"
                    width={500}
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('width', '500');
        });

        it('forwards height prop', () => {
            localStorage.setItem('theme', 'light');

            render(
                <ThemedImage
                    lightSrc="/images/light-mode.png"
                    darkSrc="/images/dark-mode.png"
                    alt="Test image"
                    height={300}
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('height', '300');
        });

        it('forwards loading prop', () => {
            localStorage.setItem('theme', 'light');

            render(
                <ThemedImage
                    lightSrc="/images/light-mode.png"
                    darkSrc="/images/dark-mode.png"
                    alt="Test image"
                    loading="lazy"
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('loading', 'lazy');
        });

        it('forwards multiple props simultaneously', () => {
            localStorage.setItem('theme', 'dark');

            render(
                <ThemedImage
                    lightSrc="/images/light-mode.png"
                    darkSrc="/images/dark-mode.png"
                    alt="Test image"
                    className="rounded-lg shadow-md"
                    width={800}
                    height={600}
                    loading="lazy"
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveClass('rounded-lg', 'shadow-md');
            expect(img).toHaveAttribute('width', '800');
            expect(img).toHaveAttribute('height', '600');
            expect(img).toHaveAttribute('loading', 'lazy');
            expect(img).toHaveAttribute('src', '/images/dark-mode.png');
        });
    });

    describe('when image sources are identical', () => {
        it('displays same source regardless of theme', () => {
            localStorage.setItem('theme', 'light');

            const { rerender } = render(
                <ThemedImage
                    lightSrc="/images/same-image.png"
                    darkSrc="/images/same-image.png"
                    alt="Same image"
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('src', '/images/same-image.png');

            localStorage.setItem('theme', 'dark');

            rerender(
                <ThemedImage
                    lightSrc="/images/same-image.png"
                    darkSrc="/images/same-image.png"
                    alt="Same image"
                />
            );

            expect(img).toHaveAttribute('src', '/images/same-image.png');
        });
    });

    describe('when alt text is empty', () => {
        it('renders with empty alt attribute', () => {
            localStorage.setItem('theme', 'light');

            const { container } = render(
                <ThemedImage
                    lightSrc="/images/light-mode.png"
                    darkSrc="/images/dark-mode.png"
                    alt=""
                />,
                { wrapper }
            );

            const img = container.querySelector('img');

            expect(img).toHaveAttribute('alt', '');
        });
    });

    describe('when sources contain special characters', () => {
        it('handles URLs with query parameters', () => {
            localStorage.setItem('theme', 'light');

            render(
                <ThemedImage
                    lightSrc="/images/light-mode.png?v=1.0"
                    darkSrc="/images/dark-mode.png?v=1.0"
                    alt="Image with query"
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('src', '/images/light-mode.png?v=1.0');
        });

        it('handles URLs with fragments', () => {
            localStorage.setItem('theme', 'dark');

            render(
                <ThemedImage
                    lightSrc="/images/light-mode.png#section"
                    darkSrc="/images/dark-mode.png#section"
                    alt="Image with fragment"
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('src', '/images/dark-mode.png#section');
        });
    });
});
