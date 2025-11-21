import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorState from './ErrorState';

describe('ErrorState', () => {
    describe('when rendered with basic props', () => {
        it('displays title', () => {
            render(
                <ErrorState
                    title="Error Title"
                    message="Error message text"
                    linkText="Link Text"
                    linkUrl="https://example.com"
                />
            );

            expect(screen.getByText('Error Title')).toBeInTheDocument();
        });

        it('displays message before link', () => {
            const { container } = render(
                <ErrorState
                    title="Error Title"
                    message="Before {link} after"
                    linkText="Link"
                    linkUrl="https://example.com"
                />
            );

            const paragraph = container.querySelector('p.text-red-600');

            expect(paragraph?.textContent).toContain('Before');
        });

        it('displays message after link', () => {
            const { container } = render(
                <ErrorState
                    title="Error Title"
                    message="Before {link} after"
                    linkText="Link"
                    linkUrl="https://example.com"
                />
            );

            const paragraph = container.querySelector('p.text-red-600');

            expect(paragraph?.textContent).toContain('after');
        });

        it('displays link text', () => {
            render(
                <ErrorState
                    title="Error Title"
                    message="Before {link} after"
                    linkText="Click Here"
                    linkUrl="https://example.com"
                />
            );

            const link = screen.getByRole('link');

            expect(link).toHaveTextContent('Click Here');
        });

        it('sets correct link href', () => {
            render(
                <ErrorState
                    title="Error Title"
                    message="Before {link} after"
                    linkText="Click Here"
                    linkUrl="https://example.com/path"
                />
            );

            const link = screen.getByRole('link');

            expect(link).toHaveAttribute('href', 'https://example.com/path');
        });
    });

    describe('when link opens in new tab', () => {
        it('sets target to _blank', () => {
            render(
                <ErrorState
                    title="Error Title"
                    message="Error {link} message"
                    linkText="Link"
                    linkUrl="https://example.com"
                />
            );

            const link = screen.getByRole('link');

            expect(link).toHaveAttribute('target', '_blank');
        });

        it('sets rel to noopener noreferrer', () => {
            render(
                <ErrorState
                    title="Error Title"
                    message="Error {link} message"
                    linkText="Link"
                    linkUrl="https://example.com"
                />
            );

            const link = screen.getByRole('link');

            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        });

        it('applies underline class', () => {
            render(
                <ErrorState
                    title="Error Title"
                    message="Error {link} message"
                    linkText="Link"
                    linkUrl="https://example.com"
                />
            );

            const link = screen.getByRole('link');

            expect(link).toHaveClass('underline');
        });
    });

    describe('when message has no link placeholder', () => {
        it('displays full message', () => {
            render(
                <ErrorState
                    title="Error Title"
                    message="Complete error message without link"
                    linkText="Link"
                    linkUrl="https://example.com"
                />
            );

            expect(screen.getByText('Complete error message without link')).toBeInTheDocument();
        });

        it('still renders link separately', () => {
            render(
                <ErrorState
                    title="Error Title"
                    message="Message without placeholder"
                    linkText="Link Text"
                    linkUrl="https://example.com"
                />
            );

            const link = screen.getByRole('link');

            expect(link).toHaveTextContent('Link Text');
        });
    });

    describe('when styling is applied', () => {
        it('has error background class', () => {
            const { container } = render(
                <ErrorState
                    title="Error Title"
                    message="Error {link} message"
                    linkText="Link"
                    linkUrl="https://example.com"
                />
            );

            const errorContainer = container.firstChild;

            expect(errorContainer).toHaveClass('bg-red-50', 'dark:bg-red-900/20');
        });

        it('has error border class', () => {
            const { container } = render(
                <ErrorState
                    title="Error Title"
                    message="Error {link} message"
                    linkText="Link"
                    linkUrl="https://example.com"
                />
            );

            const errorContainer = container.firstChild;

            expect(errorContainer).toHaveClass('border-red-200', 'dark:border-red-800');
        });

        it('has rounded corners', () => {
            const { container } = render(
                <ErrorState
                    title="Error Title"
                    message="Error {link} message"
                    linkText="Link"
                    linkUrl="https://example.com"
                />
            );

            const errorContainer = container.firstChild;

            expect(errorContainer).toHaveClass('rounded-lg');
        });
    });

    describe('when title styling is applied', () => {
        it('has error text color', () => {
            render(
                <ErrorState
                    title="Error Title"
                    message="Error {link} message"
                    linkText="Link"
                    linkUrl="https://example.com"
                />
            );

            const title = screen.getByText('Error Title');

            expect(title).toHaveClass('text-red-800', 'dark:text-red-400');
        });

        it('has semibold font weight', () => {
            render(
                <ErrorState
                    title="Error Title"
                    message="Error {link} message"
                    linkText="Link"
                    linkUrl="https://example.com"
                />
            );

            const title = screen.getByText('Error Title');

            expect(title).toHaveClass('font-semibold');
        });
    });

    describe('when message styling is applied', () => {
        it('has error text color for message', () => {
            const { container } = render(
                <ErrorState
                    title="Error Title"
                    message="Before {link} after"
                    linkText="Link"
                    linkUrl="https://example.com"
                />
            );

            const messageParts = container.querySelectorAll('p');
            const messageP = messageParts[1];

            expect(messageP).toHaveClass('text-red-600', 'dark:text-red-300');
        });
    });

    describe('when message contains special characters', () => {
        it('handles multiple {link} placeholders', () => {
            render(
                <ErrorState
                    title="Error"
                    message="First {link} and second {link} placeholder"
                    linkText="Link"
                    linkUrl="https://example.com"
                />
            );

            const link = screen.getByRole('link');

            expect(link).toBeInTheDocument();
        });

        it('handles empty before text', () => {
            render(
                <ErrorState
                    title="Error"
                    message="{link} after text"
                    linkText="Link"
                    linkUrl="https://example.com"
                />
            );

            expect(screen.getByText('after text')).toBeInTheDocument();
        });

        it('handles empty after text', () => {
            render(
                <ErrorState
                    title="Error"
                    message="Before text {link}"
                    linkText="Link"
                    linkUrl="https://example.com"
                />
            );

            expect(screen.getByText('Before text')).toBeInTheDocument();
        });
    });

    describe('when real error content is rendered', () => {
        it('displays failed to load releases error', () => {
            render(
                <ErrorState
                    title="Failed to load releases"
                    message="You can still download from {link}"
                    linkText="GitHub directly"
                    linkUrl="https://github.com/NicolaeBP/MoveIt/releases"
                />
            );

            expect(screen.getByText('Failed to load releases')).toBeInTheDocument();
            expect(screen.getByText('You can still download from')).toBeInTheDocument();

            const link = screen.getByRole('link');

            expect(link).toHaveTextContent('GitHub directly');
            expect(link).toHaveAttribute('href', 'https://github.com/NicolaeBP/MoveIt/releases');
        });
    });
});
