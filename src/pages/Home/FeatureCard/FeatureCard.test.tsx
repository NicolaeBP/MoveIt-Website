import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LanguageProvider from '@/context/LanguageContext';
import ThemeProvider from '@/context/ThemeContext';
import FeatureCard from './FeatureCard';

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
        <ThemeProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </ThemeProvider>
    </MemoryRouter>
);

describe('FeatureCard', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('when rendered with required props', () => {
        it('displays title', () => {
            render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1', 'Feature 2']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                />,
                { wrapper }
            );

            expect(screen.getByText('Smart Scheduling')).toBeInTheDocument();
        });

        it('displays description', () => {
            render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1', 'Feature 2']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                />,
                { wrapper }
            );

            expect(screen.getByText('Set custom active hours')).toBeInTheDocument();
        });

        it('displays all feature items', () => {
            render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1', 'Feature 2', 'Feature 3']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                />,
                { wrapper }
            );

            expect(screen.getByText(/Feature 1/)).toBeInTheDocument();
            expect(screen.getByText(/Feature 2/)).toBeInTheDocument();
            expect(screen.getByText(/Feature 3/)).toBeInTheDocument();
        });

        it('displays image with alt text', () => {
            render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('alt', 'Feature image');
        });
    });

    describe('when reversed prop is false', () => {
        it('renders text content first', () => {
            const { container } = render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                    reversed={false}
                />,
                { wrapper }
            );

            const grid = container.querySelector('.grid');
            const firstChild = grid?.firstElementChild;

            expect(firstChild?.querySelector('h3')).toBeInTheDocument();
        });

        it('does not apply order classes', () => {
            const { container } = render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                    reversed={false}
                />,
                { wrapper }
            );

            const textContent = container.querySelector('.text-center');

            expect(textContent).not.toHaveClass('order-1');
            expect(textContent).not.toHaveClass('order-2');
        });
    });

    describe('when reversed prop is true', () => {
        it('applies reversed order classes to text', () => {
            const { container } = render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                    reversed={true}
                />,
                { wrapper }
            );

            const textContent = container.querySelector('.text-center');

            expect(textContent).toHaveClass('order-1', 'lg:order-2');
        });

        it('applies reversed order classes to image', () => {
            const { container } = render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                    reversed={true}
                />,
                { wrapper }
            );

            const imageContainer = container.querySelector('.bg-primary-50');

            expect(imageContainer).toHaveClass('order-2', 'lg:order-1');
        });
    });

    describe('when isLCP is true', () => {
        it('sets fetchPriority to high', () => {
            render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                    isLCP={true}
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('fetchpriority', 'high');
        });

        it('does not set loading attribute', () => {
            render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                    isLCP={true}
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).not.toHaveAttribute('loading');
        });
    });

    describe('when isLCP is false', () => {
        it('sets loading to lazy', () => {
            render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                    isLCP={false}
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('loading', 'lazy');
        });
    });

    describe('when width and height are provided', () => {
        it('sets width attribute', () => {
            render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                    width={800}
                    height={600}
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('width', '800');
        });

        it('sets height attribute', () => {
            render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                    width={800}
                    height={600}
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('height', '600');
        });
    });

    describe('when items array contains checkmarks', () => {
        it('prefixes each item with checkmark', () => {
            render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1', 'Feature 2']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                />,
                { wrapper }
            );

            expect(screen.getByText(/✓ Feature 1/)).toBeInTheDocument();
            expect(screen.getByText(/✓ Feature 2/)).toBeInTheDocument();
        });

        it('renders empty list when items array is empty', () => {
            const { container } = render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={[]}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                />,
                { wrapper }
            );

            const list = container.querySelector('ul');

            expect(list?.children.length).toBe(0);
        });

        it('renders single item correctly', () => {
            render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Only Feature']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                />,
                { wrapper }
            );

            expect(screen.getByText(/✓ Only Feature/)).toBeInTheDocument();
        });
    });

    describe('when theme changes', () => {
        it('displays dark image for dark theme', () => {
            localStorage.setItem('theme', 'dark');

            render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('src', '/dark.png');
        });

        it('displays light image for light theme', () => {
            localStorage.setItem('theme', 'light');

            render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                />,
                { wrapper }
            );

            const img = screen.getByRole('img');

            expect(img).toHaveAttribute('src', '/light.png');
        });
    });

    describe('when card structure is rendered', () => {
        it('has grid layout', () => {
            const { container } = render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                />,
                { wrapper }
            );

            expect(container.querySelector('.grid')).toBeInTheDocument();
        });

        it('has semantic heading', () => {
            render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                />,
                { wrapper }
            );

            const heading = screen.getByRole('heading', { level: 3 });

            expect(heading).toHaveTextContent('Smart Scheduling');
        });

        it('has unordered list for items', () => {
            const { container } = render(
                <FeatureCard
                    title="Smart Scheduling"
                    description="Set custom active hours"
                    items={['Feature 1', 'Feature 2']}
                    lightSrc="/light.png"
                    darkSrc="/dark.png"
                    alt="Feature image"
                />,
                { wrapper }
            );

            const list = container.querySelector('ul');

            expect(list).toBeInTheDocument();
            expect(list?.children.length).toBe(2);
        });
    });
});
