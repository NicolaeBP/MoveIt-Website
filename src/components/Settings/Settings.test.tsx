import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import LanguageProvider from '@/context/LanguageContext';
import ThemeProvider from '@/context/ThemeContext';
import Settings from './Settings';

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
        <ThemeProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </ThemeProvider>
    </MemoryRouter>
);

describe('Settings', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('when isOpen is false', () => {
        it('renders nothing', () => {
            const { container } = render(
                <Settings isOpen={false} onClose={() => {}} />,
                { wrapper }
            );

            expect(container.firstChild).toBeNull();
        });

        it('does not display settings title', () => {
            render(<Settings isOpen={false} onClose={() => {}} />, { wrapper });

            expect(screen.queryByText('Settings')).not.toBeInTheDocument();
        });
    });

    describe('when isOpen is true', () => {
        it('renders settings modal', () => {
            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            expect(screen.getByRole('menu')).toBeInTheDocument();
        });

        it('displays settings title', () => {
            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            expect(screen.getByText('Settings')).toBeInTheDocument();
        });

        it('has correct aria-label', () => {
            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            const menu = screen.getByRole('menu');

            expect(menu).toHaveAttribute('aria-label', 'Settings');
        });

        it('displays theme section label', () => {
            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            expect(screen.getByText('Theme')).toBeInTheDocument();
        });

        it('displays language section label', () => {
            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            expect(screen.getByText('Language')).toBeInTheDocument();
        });
    });

    describe('when theme buttons are displayed', () => {
        it('shows all three theme options', () => {
            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            expect(screen.getByText('Light')).toBeInTheDocument();
            expect(screen.getByText('Dark')).toBeInTheDocument();
            expect(screen.getByText('Auto')).toBeInTheDocument();
        });

        it('highlights current theme (auto by default)', () => {
            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            const autoButton = screen.getByText('Auto').closest('button');

            expect(autoButton).toHaveClass('border-primary-600');
        });

        it('applies correct styling to non-selected themes', () => {
            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            const lightButton = screen.getByText('Light').closest('button');

            expect(lightButton).toHaveClass('border-gray-200');
        });
    });

    describe('when light theme button is clicked', () => {
        it('changes theme to light', async () => {
            const user = userEvent.setup();

            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            const lightButton = screen.getByText('Light');
            await user.click(lightButton);

            await waitFor(() => {
                const lightButtonElement = screen.getByText('Light').closest('button');

                expect(lightButtonElement).toHaveClass('border-primary-600');
            });
        });

        it('removes highlight from previously selected theme', async () => {
            const user = userEvent.setup();

            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            const lightButton = screen.getByText('Light');

            await user.click(lightButton);

            await waitFor(() => {
                const autoButton = screen.getByText('Auto').closest('button');

                expect(autoButton).toHaveClass('border-gray-200');
            });
        });
    });

    describe('when dark theme button is clicked', () => {
        it('changes theme to dark', async () => {
            const user = userEvent.setup();

            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            const darkButton = screen.getByText('Dark');

            await user.click(darkButton);

            await waitFor(() => {
                const darkButtonElement = screen.getByText('Dark').closest('button');

                expect(darkButtonElement).toHaveClass('border-primary-600');
            });
        });
    });

    describe('when auto theme button is clicked', () => {
        it('changes theme to auto', async () => {
            const user = userEvent.setup();

            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            // First switch to light
            const lightButton = screen.getByText('Light');

            await user.click(lightButton);

            // Then switch back to auto
            const autoButton = screen.getByText('Auto');

            await user.click(autoButton);

            await waitFor(() => {
                const autoButtonElement = screen.getByText('Auto').closest('button');

                expect(autoButtonElement).toHaveClass('border-primary-600');
            });
        });
    });

    describe('when language select is displayed', () => {
        it('shows language dropdown', () => {
            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            expect(screen.getByLabelText('Language')).toBeInTheDocument();
        });

        it('displays all supported languages', () => {
            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            const select = screen.getByLabelText('Language') as HTMLSelectElement;
            const options = Array.from(select.options).map(opt => opt.value);

            expect(options).toContain('en');
            expect(options).toContain('ro');
            expect(options).toContain('es');
            expect(options).toContain('fr');
            expect(options).toContain('de');
            expect(options).toContain('it');
            expect(options).toContain('pt-BR');
            expect(options).toContain('pt-PT');
            expect(options).toContain('ru');
            expect(options).toContain('zh-Hans');
            expect(options).toContain('zh-Hant');
            expect(options).toContain('ja');
            expect(options).toContain('ko');
        });

        it('shows English as default language', () => {
            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            const select = screen.getByLabelText('Language') as HTMLSelectElement;

            expect(select.value).toBe('en');
        });

        it('has correct name attribute', () => {
            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            const select = screen.getByLabelText('Language');

            expect(select).toHaveAttribute('name', 'language');
        });

        it('has correct id attribute', () => {
            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            const select = screen.getByLabelText('Language');

            expect(select).toHaveAttribute('id', 'language-select');
        });
    });

    describe('when language is changed', () => {
        it('updates to Romanian', async () => {
            const user = userEvent.setup();

            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            const select = screen.getByLabelText('Language') as HTMLSelectElement;

            await user.selectOptions(select, 'ro');

            await waitFor(() => {
                expect(select.value).toBe('ro');
            });
        });

        it('updates to Spanish', async () => {
            const user = userEvent.setup();

            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            const select = screen.getByLabelText('Language') as HTMLSelectElement;

            await user.selectOptions(select, 'es');

            await waitFor(() => {
                expect(select.value).toBe('es');
            });
        });

        it('updates to French', async () => {
            const user = userEvent.setup();

            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            const select = screen.getByLabelText('Language') as HTMLSelectElement;

            await user.selectOptions(select, 'fr');

            await waitFor(() => {
                expect(select.value).toBe('fr');
            });
        });
    });

    describe('when Escape key is pressed', () => {
        it('calls onClose callback', async () => {
            const onClose = vi.fn();

            render(<Settings isOpen={true} onClose={onClose} />, { wrapper });

            const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });

            document.dispatchEvent(escapeEvent);

            await waitFor(() => {
                expect(onClose).toHaveBeenCalledTimes(1);
            });
        });

        it('does not call onClose when other keys are pressed', async () => {
            const onClose = vi.fn();

            render(<Settings isOpen={true} onClose={onClose} />, { wrapper });

            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });

            document.dispatchEvent(enterEvent);

            await waitFor(() => {
                expect(onClose).not.toHaveBeenCalled();
            });
        });
    });

    describe('when clicking outside settings panel', () => {
        it('calls onClose callback', async () => {
            const onClose = vi.fn();

            render(
                <div>
                    <div data-testid="outside">Outside</div>
                    <Settings isOpen={true} onClose={onClose} />
                </div>,
                { wrapper }
            );

            const outsideElement = screen.getByTestId('outside');
            const clickEvent = new MouseEvent('click', { bubbles: true });

            outsideElement.dispatchEvent(clickEvent);

            await waitFor(() => {
                expect(onClose).toHaveBeenCalled();
            });
        });

        it('does not call onClose when clicking inside settings panel', async () => {
            const onClose = vi.fn();

            render(<Settings isOpen={true} onClose={onClose} />, { wrapper });

            const settingsPanel = screen.getByRole('menu');
            const clickEvent = new MouseEvent('click', { bubbles: true });

            settingsPanel.dispatchEvent(clickEvent);

            await waitFor(() => {
                expect(onClose).not.toHaveBeenCalled();
            });
        });
    });

    describe('when modal closes', () => {
        it('removes keyboard event listener', async () => {
            const onClose = vi.fn();
            const { rerender } = render(<Settings isOpen={true} onClose={onClose} />, { wrapper });

            rerender(<Settings isOpen={false} onClose={onClose} />);

            const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });

            document.dispatchEvent(escapeEvent);

            await new Promise(resolve => setTimeout(resolve, 50));

            expect(onClose).not.toHaveBeenCalled();
        });
    });

    describe('when theme icons are displayed', () => {
        it('displays Sun icon for Light theme', () => {
            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            const lightButton = screen.getByText('Light').closest('button');
            const svg = lightButton?.querySelector('svg');

            expect(svg).toBeInTheDocument();
        });

        it('displays Moon icon for Dark theme', () => {
            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            const darkButton = screen.getByText('Dark').closest('button');
            const svg = darkButton?.querySelector('svg');

            expect(svg).toBeInTheDocument();
        });

        it('displays Lightbulb icon for Auto theme', () => {
            render(<Settings isOpen={true} onClose={() => {}} />, { wrapper });

            const autoButton = screen.getByText('Auto').closest('button');
            const svg = autoButton?.querySelector('svg');

            expect(svg).toBeInTheDocument();
        });
    });
});
