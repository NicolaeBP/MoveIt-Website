import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StoreSection from './StoreSection';

describe('StoreSection', () => {
    describe('when rendered as link', () => {
        it('renders as anchor element', () => {
            render(<StoreSection title="Mac App Store" description="Download from store" features={[]} text="Download" href="https://apps.apple.com" />);

            const link = screen.getByRole('link', { name: 'Download' });

            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', 'https://apps.apple.com');
        });

        it('opens in new tab', () => {
            render(<StoreSection title="Mac App Store" description="Download from store" features={[]} text="Download" href="https://apps.apple.com" />);

            const link = screen.getByRole('link');

            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        });
    });

    describe('when rendered as button', () => {
        it('renders as button element', () => {
            render(<StoreSection title="Windows Store" description="Coming soon" features={[]} text="Coming Soon" disabled={true} />);

            const button = screen.getByRole('button', { name: 'Coming Soon' });

            expect(button).toBeInTheDocument();
        });

        it('is disabled when disabled prop is true', () => {
            render(<StoreSection title="Windows Store" description="Coming soon" features={[]} text="Coming Soon" disabled={true} />);

            const button = screen.getByRole('button');

            expect(button).toBeDisabled();
        });

        it('applies disabled styling', () => {
            render(<StoreSection title="Windows Store" description="Coming soon" features={[]} text="Coming Soon" disabled={true} />);

            const button = screen.getByRole('button');

            expect(button).toHaveClass('cursor-not-allowed');
        });
    });

    describe('when features are provided', () => {
        it('displays all features', () => {
            const features = ['Feature 1', 'Feature 2', 'Feature 3'];

            render(<StoreSection title="Store" description="Description" features={features} text="Download" href="https://example.com" />);

            features.forEach(feature => {
                expect(screen.getByText(feature)).toBeInTheDocument();
            });
        });

        it('renders check icons for features', () => {
            const features = ['Feature 1'];

            const { container } = render(<StoreSection title="Store" description="Description" features={features} text="Download" href="https://example.com" />);

            const checkIcons = container.querySelectorAll('.text-green-500');

            expect(checkIcons.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('when description contains bold markers', () => {
        it('renders bold text', () => {
            render(<StoreSection title="Store" description="Normal {bold}bold text{/bold} normal" features={[]} text="Download" href="https://example.com" />);

            const strong = screen.getByText('bold text');

            expect(strong.tagName).toBe('STRONG');
        });

        it('handles multiple bold sections', () => {
            const { container } = render(<StoreSection title="Store" description="{bold}First{/bold} and {bold}Second{/bold}" features={[]} text="Download" href="https://example.com" />);

            const strongElements = container.querySelectorAll('strong');

            expect(strongElements.length).toBe(2);
        });
    });

    describe('when icon is provided', () => {
        it('displays icon', () => {
            const icon = <svg data-testid="custom-icon" />;

            render(<StoreSection title="Store" description="Description" features={[]} text="Download" href="https://example.com" icon={icon} />);

            expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
        });
    });

    describe('when decorative icon is provided', () => {
        it('displays decorative icon', () => {
            const decorativeIcon = <svg data-testid="decorative-icon" />;

            render(<StoreSection title="Store" description="Description" features={[]} text="Download" href="https://example.com" decorativeIcon={decorativeIcon} />);

            expect(screen.getByTestId('decorative-icon')).toBeInTheDocument();
        });

        it('applies reverse order when reverse is true', () => {
            const decorativeIcon = <div data-testid="decorative-icon">Icon</div>;

            const { container } = render(<StoreSection title="Store" description="Description" features={[]} text="Download" href="https://example.com" decorativeIcon={decorativeIcon} reverse={true} />);

            const decorativeContainer = container.querySelector('.order-1');

            expect(decorativeContainer).toBeInTheDocument();
        });
    });
});
