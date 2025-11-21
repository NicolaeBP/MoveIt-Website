import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LanguageProvider from '@/context/LanguageContext';
import ThemeProvider from '@/context/ThemeContext';
import SupportSection from './SupportSection';

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
        <ThemeProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </ThemeProvider>
    </MemoryRouter>
);

describe('SupportSection', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('when rendered with blue icon color', () => {
        it('applies blue container classes', () => {
            const icon = <svg data-testid="icon" />;

            const { container } = render(
                <SupportSection
                    icon={icon}
                    iconColor="blue"
                    titleKey="contact.support.documentation.title"
                    descriptionKey="contact.support.documentation.description"
                    linkTextKey="contact.support.documentation.link"
                    linkHref="https://github.com"
                />,
                { wrapper }
            );

            const iconContainer = container.querySelector('.bg-blue-100');

            expect(iconContainer).toBeInTheDocument();
        });
    });

    describe('when rendered with green icon color', () => {
        it('applies green container classes', () => {
            const icon = <svg data-testid="icon" />;

            const { container } = render(
                <SupportSection
                    icon={icon}
                    iconColor="green"
                    titleKey="contact.support.community.title"
                    descriptionKey="contact.support.community.description"
                    linkTextKey="contact.support.community.link"
                    linkHref="https://github.com"
                />,
                { wrapper }
            );

            const iconContainer = container.querySelector('.bg-green-100');

            expect(iconContainer).toBeInTheDocument();
        });
    });

    describe('when rendered with purple icon color', () => {
        it('applies purple container classes', () => {
            const icon = <svg data-testid="icon" />;

            const { container } = render(
                <SupportSection
                    icon={icon}
                    iconColor="purple"
                    titleKey="contact.support.privacy.title"
                    descriptionKey="contact.support.privacy.description"
                    linkTextKey="contact.support.privacy.link"
                    linkHref="https://github.com"
                />,
                { wrapper }
            );

            const iconContainer = container.querySelector('.bg-purple-100');

            expect(iconContainer).toBeInTheDocument();
        });
    });

    describe('when title and description are rendered', () => {
        it('displays title from translation', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <SupportSection
                    icon={icon}
                    iconColor="blue"
                    titleKey="contact.support.documentation.title"
                    descriptionKey="contact.support.documentation.description"
                    linkTextKey="contact.support.documentation.link"
                    linkHref="https://github.com"
                />,
                { wrapper }
            );

            expect(screen.getByText('Documentation')).toBeInTheDocument();
        });

        it('displays description text before link', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <SupportSection
                    icon={icon}
                    iconColor="blue"
                    titleKey="contact.support.documentation.title"
                    descriptionKey="contact.support.documentation.description"
                    linkTextKey="contact.support.documentation.link"
                    linkHref="https://github.com"
                />,
                { wrapper }
            );

            expect(screen.getByText(/Check out the/)).toBeInTheDocument();
        });

        it('displays description text after link', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <SupportSection
                    icon={icon}
                    iconColor="blue"
                    titleKey="contact.support.documentation.title"
                    descriptionKey="contact.support.documentation.description"
                    linkTextKey="contact.support.documentation.link"
                    linkHref="https://github.com"
                />,
                { wrapper }
            );

            expect(screen.getByText(/on GitHub for setup instructions and usage guides/)).toBeInTheDocument();
        });
    });

    describe('when link is rendered', () => {
        it('displays link text', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <SupportSection
                    icon={icon}
                    iconColor="blue"
                    titleKey="contact.support.documentation.title"
                    descriptionKey="contact.support.documentation.description"
                    linkTextKey="contact.support.documentation.link"
                    linkHref="https://github.com/user/repo"
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).toHaveTextContent('README');
        });

        it('sets correct href', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <SupportSection
                    icon={icon}
                    iconColor="blue"
                    titleKey="contact.support.documentation.title"
                    descriptionKey="contact.support.documentation.description"
                    linkTextKey="contact.support.documentation.link"
                    linkHref="https://github.com/user/repo"
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).toHaveAttribute('href', 'https://github.com/user/repo');
        });

        it('opens in new tab', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <SupportSection
                    icon={icon}
                    iconColor="blue"
                    titleKey="contact.support.documentation.title"
                    descriptionKey="contact.support.documentation.description"
                    linkTextKey="contact.support.documentation.link"
                    linkHref="https://github.com/user/repo"
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).toHaveAttribute('target', '_blank');
        });

        it('has security attributes', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <SupportSection
                    icon={icon}
                    iconColor="blue"
                    titleKey="contact.support.documentation.title"
                    descriptionKey="contact.support.documentation.description"
                    linkTextKey="contact.support.documentation.link"
                    linkHref="https://github.com/user/repo"
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        });

        it('applies underline class', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <SupportSection
                    icon={icon}
                    iconColor="blue"
                    titleKey="contact.support.documentation.title"
                    descriptionKey="contact.support.documentation.description"
                    linkTextKey="contact.support.documentation.link"
                    linkHref="https://github.com/user/repo"
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).toHaveClass('underline');
        });
    });

    describe('when icon is rendered', () => {
        it('displays icon', () => {
            const icon = <svg data-testid="test-icon" />;

            render(
                <SupportSection
                    icon={icon}
                    iconColor="blue"
                    titleKey="contact.support.documentation.title"
                    descriptionKey="contact.support.documentation.description"
                    linkTextKey="contact.support.documentation.link"
                    linkHref="https://github.com"
                />,
                { wrapper }
            );

            expect(screen.getByTestId('test-icon')).toBeInTheDocument();
        });
    });

    describe('when semantic structure is present', () => {
        it('has heading with correct level', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <SupportSection
                    icon={icon}
                    iconColor="blue"
                    titleKey="contact.support.documentation.title"
                    descriptionKey="contact.support.documentation.description"
                    linkTextKey="contact.support.documentation.link"
                    linkHref="https://github.com"
                />,
                { wrapper }
            );

            const heading = screen.getByRole('heading', { level: 3 });

            expect(heading).toHaveTextContent('Documentation');
        });
    });

    describe('when community section is rendered', () => {
        it('displays community title', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <SupportSection
                    icon={icon}
                    iconColor="green"
                    titleKey="contact.support.community.title"
                    descriptionKey="contact.support.community.description"
                    linkTextKey="contact.support.community.link"
                    linkHref="https://github.com/discussions"
                />,
                { wrapper }
            );

            expect(screen.getByText('Community')).toBeInTheDocument();
        });

        it('displays community link text', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <SupportSection
                    icon={icon}
                    iconColor="green"
                    titleKey="contact.support.community.title"
                    descriptionKey="contact.support.community.description"
                    linkTextKey="contact.support.community.link"
                    linkHref="https://github.com/discussions"
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).toHaveTextContent('GitHub Discussions');
        });
    });

    describe('when privacy section is rendered', () => {
        it('displays privacy title', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <SupportSection
                    icon={icon}
                    iconColor="purple"
                    titleKey="contact.support.privacy.title"
                    descriptionKey="contact.support.privacy.description"
                    linkTextKey="contact.support.privacy.link"
                    linkHref="https://example.com/privacy"
                />,
                { wrapper }
            );

            const privacyTexts = screen.getAllByText('Privacy Policy');

            expect(privacyTexts.length).toBeGreaterThanOrEqual(1);
        });

        it('displays privacy link text', () => {
            const icon = <svg data-testid="icon" />;

            render(
                <SupportSection
                    icon={icon}
                    iconColor="purple"
                    titleKey="contact.support.privacy.title"
                    descriptionKey="contact.support.privacy.description"
                    linkTextKey="contact.support.privacy.link"
                    linkHref="https://example.com/privacy"
                />,
                { wrapper }
            );

            const link = screen.getByRole('link');

            expect(link).toHaveTextContent('Privacy Policy');
        });
    });
});
