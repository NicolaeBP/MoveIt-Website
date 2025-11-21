import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UseCaseCard from './UseCaseCard';

describe('UseCaseCard', () => {
    describe('when rendered with props', () => {
        it('displays title', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <UseCaseCard
                    icon={icon}
                    title="Remote Presentations"
                    description="Keep your screen active during virtual meetings"
                />
            );

            expect(screen.getByText('Remote Presentations')).toBeInTheDocument();
        });

        it('displays description', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <UseCaseCard
                    icon={icon}
                    title="Remote Presentations"
                    description="Keep your screen active during virtual meetings"
                />
            );

            expect(screen.getByText('Keep your screen active during virtual meetings')).toBeInTheDocument();
        });

        it('renders icon', () => {
            const icon = <svg data-testid="test-icon" />;

            render(
                <UseCaseCard
                    icon={icon}
                    title="Test Title"
                    description="Test Description"
                />
            );

            expect(screen.getByTestId('test-icon')).toBeInTheDocument();
        });
    });

    describe('when rendered with different content', () => {
        it('displays long title correctly', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <UseCaseCard
                    icon={icon}
                    title="Very Long Title That Should Wrap to Multiple Lines if Necessary"
                    description="Description"
                />
            );

            expect(screen.getByText(/Very Long Title/)).toBeInTheDocument();
        });

        it('displays long description correctly', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <UseCaseCard
                    icon={icon}
                    title="Title"
                    description="This is a very long description that might span multiple lines when rendered on the page and should still display properly without breaking the layout"
                />
            );

            expect(screen.getByText(/very long description/)).toBeInTheDocument();
        });

        it('renders with complex icon element', () => {
            const icon = (
                <div data-testid="complex-icon">
                    <svg><circle /></svg>
                    <span>Icon Text</span>
                </div>
            );

            render(
                <UseCaseCard
                    icon={icon}
                    title="Title"
                    description="Description"
                />
            );

            expect(screen.getByTestId('complex-icon')).toBeInTheDocument();
            expect(screen.getByText('Icon Text')).toBeInTheDocument();
        });
    });

    describe('when rendered with empty strings', () => {
        it('renders with empty title', () => {
            const icon = <svg data-testid="icon" />;

            const { container } = render(
                <UseCaseCard
                    icon={icon}
                    title=""
                    description="Description"
                />
            );

            expect(container.querySelector('h3')).toBeEmptyDOMElement();
        });

        it('renders with empty description', () => {
            const icon = <svg data-testid="icon" />;

            const { container } = render(
                <UseCaseCard
                    icon={icon}
                    title="Title"
                    description=""
                />
            );

            expect(container.querySelector('p')).toBeEmptyDOMElement();
        });
    });

    describe('when rendered with special characters', () => {
        it('handles HTML entities in title', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <UseCaseCard
                    icon={icon}
                    title="Remote & Presentations <Test>"
                    description="Description"
                />
            );

            expect(screen.getByText('Remote & Presentations <Test>')).toBeInTheDocument();
        });

        it('handles Unicode characters in description', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <UseCaseCard
                    icon={icon}
                    title="Title"
                    description="Keep your screen active 🎯 during meetings 💼"
                />
            );

            expect(screen.getByText(/Keep your screen active 🎯/)).toBeInTheDocument();
        });

        it('handles newlines in description', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <UseCaseCard
                    icon={icon}
                    title="Title"
                    description="Line one\nLine two"
                />
            );

            expect(screen.getByText(/Line one.*Line two/s)).toBeInTheDocument();
        });
    });

    describe('when card structure is rendered', () => {
        it('has correct class structure', () => {
            const icon = <svg data-testid="icon" />;

            const { container } = render(
                <UseCaseCard
                    icon={icon}
                    title="Title"
                    description="Description"
                />
            );

            const card = container.firstChild as HTMLElement;

            expect(card).toHaveClass('bg-white', 'dark:bg-[#2D2D2D]', 'rounded-lg');
        });

        it('has semantic HTML structure', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <UseCaseCard
                    icon={icon}
                    title="Title"
                    description="Description"
                />
            );

            const heading = screen.getByRole('heading', { level: 3 });

            expect(heading).toHaveTextContent('Title');
        });
    });

    describe('when rendered multiple times', () => {
        it('renders multiple cards independently', () => {
            const icon1 = <svg data-testid="icon-1" />;
            const icon2 = <svg data-testid="icon-2" />;

            const { rerender } = render(
                <UseCaseCard
                    icon={icon1}
                    title="Card 1"
                    description="Description 1"
                />
            );

            expect(screen.getByText('Card 1')).toBeInTheDocument();

            rerender(
                <UseCaseCard
                    icon={icon2}
                    title="Card 2"
                    description="Description 2"
                />
            );

            expect(screen.getByText('Card 2')).toBeInTheDocument();
            expect(screen.queryByText('Card 1')).not.toBeInTheDocument();
        });
    });
});
