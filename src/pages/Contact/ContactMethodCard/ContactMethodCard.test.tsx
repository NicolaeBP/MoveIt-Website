import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LanguageProvider from '@/context/LanguageContext';
import ThemeProvider from '@/context/ThemeContext';
import ContactMethodCard from './ContactMethodCard';

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
        <ThemeProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </ThemeProvider>
    </MemoryRouter>
);

describe('ContactMethodCard', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('when rendered with basic props', () => {
        it('displays label from translation key', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <ContactMethodCard
                    href="mailto:test@example.com"
                    icon={icon}
                    labelKey="contact.methods.email.label"
                    valueKey="contact.methods.email.value"
                />,
                { wrapper }
            );

            expect(screen.getByText('Email')).toBeInTheDocument();
        });

        it('displays value from translation key', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <ContactMethodCard
                    href="mailto:test@example.com"
                    icon={icon}
                    labelKey="contact.methods.email.label"
                    valueKey="contact.methods.email.value"
                />,
                { wrapper }
            );

            expect(screen.getByText('nicolae.balica@bpconsulting.pro')).toBeInTheDocument();
        });

        it('renders icon', () => {
            const icon = <svg data-testid="test-icon" />;

            render(
                <ContactMethodCard
                    href="mailto:test@example.com"
                    icon={icon}
                    labelKey="contact.methods.email.label"
                    valueKey="contact.methods.email.value"
                />,
                { wrapper }
            );

            expect(screen.getByTestId('test-icon')).toBeInTheDocument();
        });

        it('renders as link with correct href', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <ContactMethodCard
                    href="mailto:test@example.com"
                    icon={icon}
                    labelKey="contact.methods.email.label"
                    valueKey="contact.methods.email.value"
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).toHaveAttribute('href', 'mailto:test@example.com');
        });
    });

    describe('when external prop is false', () => {
        it('does not set target attribute', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <ContactMethodCard
                    href="/contact"
                    icon={icon}
                    labelKey="contact.methods.email.label"
                    valueKey="contact.methods.email.value"
                    external={false}
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).not.toHaveAttribute('target');
        });

        it('does not set rel attribute', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <ContactMethodCard
                    href="/contact"
                    icon={icon}
                    labelKey="contact.methods.email.label"
                    valueKey="contact.methods.email.value"
                    external={false}
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).not.toHaveAttribute('rel');
        });
    });

    describe('when external prop is true', () => {
        it('sets target to _blank', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <ContactMethodCard
                    href="https://github.com/user"
                    icon={icon}
                    labelKey="contact.methods.github.label"
                    valueKey="contact.methods.github.value"
                    external={true}
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).toHaveAttribute('target', '_blank');
        });

        it('sets rel to noopener noreferrer', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <ContactMethodCard
                    href="https://github.com/user"
                    icon={icon}
                    labelKey="contact.methods.github.label"
                    valueKey="contact.methods.github.value"
                    external={true}
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        });
    });

    describe('when external prop is not provided', () => {
        it('defaults to internal link', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <ContactMethodCard
                    href="/contact"
                    icon={icon}
                    labelKey="contact.methods.email.label"
                    valueKey="contact.methods.email.value"
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).not.toHaveAttribute('target');
            expect(link).not.toHaveAttribute('rel');
        });
    });

    describe('when rendered with different hrefs', () => {
        it('handles mailto links', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <ContactMethodCard
                    href="mailto:user@example.com"
                    icon={icon}
                    labelKey="contact.methods.email.label"
                    valueKey="contact.methods.email.value"
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).toHaveAttribute('href', 'mailto:user@example.com');
        });

        it('handles https URLs', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <ContactMethodCard
                    href="https://github.com/user"
                    icon={icon}
                    labelKey="contact.methods.github.label"
                    valueKey="contact.methods.github.value"
                    external={true}
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).toHaveAttribute('href', 'https://github.com/user');
        });

        it('handles relative URLs', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <ContactMethodCard
                    href="/internal-page"
                    icon={icon}
                    labelKey="contact.methods.email.label"
                    valueKey="contact.methods.email.value"
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).toHaveAttribute('href', '/internal-page');
        });
    });

    describe('when rendered with complex icons', () => {
        it('renders complex icon structure', () => {
            const icon = (
                <div data-testid="complex-icon">
                    <svg><circle /></svg>
                    <span>Icon Label</span>
                </div>
            );

            render(
                <ContactMethodCard
                    href="mailto:test@example.com"
                    icon={icon}
                    labelKey="contact.methods.email.label"
                    valueKey="contact.methods.email.value"
                />,
                { wrapper }
            );

            expect(screen.getByTestId('complex-icon')).toBeInTheDocument();
            expect(screen.getByText('Icon Label')).toBeInTheDocument();
        });
    });

    describe('when card structure is rendered', () => {
        it('has correct semantic structure', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <ContactMethodCard
                    href="mailto:test@example.com"
                    icon={icon}
                    labelKey="contact.methods.email.label"
                    valueKey="contact.methods.email.value"
                />,
                { wrapper }
            );

            const heading = screen.getByRole('heading', { level: 3 });

            expect(heading).toHaveTextContent('Email');
        });

        it('applies transition and hover classes', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <ContactMethodCard
                    href="mailto:test@example.com"
                    icon={icon}
                    labelKey="contact.methods.email.label"
                    valueKey="contact.methods.email.value"
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).toHaveClass('transition-colors', 'hover:bg-primary-50');
        });
    });

    describe('when rendered with GitHub contact method', () => {
        it('displays GitHub label', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <ContactMethodCard
                    href="https://github.com/NicolaeBP"
                    icon={icon}
                    labelKey="contact.methods.github.label"
                    valueKey="contact.methods.github.value"
                    external={true}
                />,
                { wrapper }
            );

            expect(screen.getByText('GitHub')).toBeInTheDocument();
        });

        it('displays GitHub value', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <ContactMethodCard
                    href="https://github.com/NicolaeBP"
                    icon={icon}
                    labelKey="contact.methods.github.label"
                    valueKey="contact.methods.github.value"
                    external={true}
                />,
                { wrapper }
            );

            expect(screen.getByText('@NicolaeBP')).toBeInTheDocument();
        });
    });
});
