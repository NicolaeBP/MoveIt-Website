import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import ThemeProvider, { useTheme } from './ThemeContext';

const mockMatchMedia = (matches: boolean) => {
    Object.defineProperty(globalThis, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
};

const TestComponent = () => {
    const { theme, setTheme, effectiveTheme } = useTheme();

    return (
        <div>
            <div data-testid="theme">{theme}</div>
            <div data-testid="effective-theme">{effectiveTheme}</div>
            <button onClick={() => setTheme('light')}>Set Light</button>
            <button onClick={() => setTheme('dark')}>Set Dark</button>
            <button onClick={() => setTheme('auto')}>Set Auto</button>
        </div>
    );
};

describe('ThemeContext', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove('dark');
        mockMatchMedia(false);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('ThemeProvider', () => {
        describe('when no theme is stored', () => {
            it('initializes with auto theme', () => {
                render(
                    <ThemeProvider>
                        <TestComponent />
                    </ThemeProvider>
                );

                expect(screen.getByTestId('theme')).toHaveTextContent('auto');
            });

            it('sets effective theme based on system preference', () => {
                render(
                    <ThemeProvider>
                        <TestComponent />
                    </ThemeProvider>
                );

                // matchMedia mock from setup.ts returns false by default
                expect(screen.getByTestId('effective-theme')).toHaveTextContent('light');
            });
        });

        describe('when theme is stored in localStorage', () => {
            it('initializes with stored theme', () => {
                localStorage.setItem('theme', 'dark');

                render(
                    <ThemeProvider>
                        <TestComponent />
                    </ThemeProvider>
                );

                expect(screen.getByTestId('theme')).toHaveTextContent('dark');
            });
        });

        describe('when setTheme is called', () => {
            it('updates theme to light', async () => {
                render(
                    <ThemeProvider>
                        <TestComponent />
                    </ThemeProvider>
                );

                const button = screen.getByText('Set Light');

                await act(async () => {
                    button.click();
                });

                await waitFor(() => {
                    expect(screen.getByTestId('theme')).toHaveTextContent('light');
                });
            });

            it('updates theme to dark', async () => {
                render(
                    <ThemeProvider>
                        <TestComponent />
                    </ThemeProvider>
                );

                const button = screen.getByText('Set Dark');

                await act(async () => {
                    button.click();
                });

                await waitFor(() => {
                    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
                });
            });

            it('stores theme in localStorage', async () => {
                render(
                    <ThemeProvider>
                        <TestComponent />
                    </ThemeProvider>
                );

                const button = screen.getByText('Set Dark');

                await act(async () => {
                    button.click();
                });

                await waitFor(() => {
                    expect(localStorage.getItem('theme')).toBe('dark');
                });
            });
        });

        describe('when theme is light', () => {
            it('sets effective theme to light', async () => {
                render(
                    <ThemeProvider>
                        <TestComponent />
                    </ThemeProvider>
                );

                const button = screen.getByText('Set Light');

                await act(async () => {
                    button.click();
                });

                await waitFor(() => {
                    expect(screen.getByTestId('effective-theme')).toHaveTextContent('light');
                });
            });

            it('removes dark class from document element', async () => {
                document.documentElement.classList.add('dark');

                render(
                    <ThemeProvider>
                        <TestComponent />
                    </ThemeProvider>
                );

                const button = screen.getByText('Set Light');

                await act(async () => {
                    button.click();
                });

                await waitFor(() => {
                    expect(document.documentElement.classList.contains('dark')).toBe(false);
                });
            });
        });

        describe('when theme is dark', () => {
            it('sets effective theme to dark', async () => {
                render(
                    <ThemeProvider>
                        <TestComponent />
                    </ThemeProvider>
                );

                const button = screen.getByText('Set Dark');

                await act(async () => {
                    button.click();
                });

                await waitFor(() => {
                    expect(screen.getByTestId('effective-theme')).toHaveTextContent('dark');
                });
            });

            it('adds dark class to document element', async () => {
                render(
                    <ThemeProvider>
                        <TestComponent />
                    </ThemeProvider>
                );

                const button = screen.getByText('Set Dark');

                await act(async () => {
                    button.click();
                });

                await waitFor(() => {
                    expect(document.documentElement.classList.contains('dark')).toBe(true);
                });
            });
        });

        describe('when theme is auto', () => {
            it('updates effective theme based on system preference', async () => {
                render(
                    <ThemeProvider>
                        <TestComponent />
                    </ThemeProvider>
                );

                const button = screen.getByText('Set Auto');

                await act(async () => {
                    button.click();
                });

                await waitFor(() => {
                    expect(screen.getByTestId('theme')).toHaveTextContent('auto');
                });

                expect(screen.getByTestId('effective-theme')).toHaveTextContent('light');
            });
        });
    });

    describe('useTheme', () => {
        describe('when used outside ThemeProvider', () => {
            it('throws an error', () => {
                const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

                expect(() => {
                    render(<TestComponent />);
                }).toThrow('useTheme must be used within ThemeProvider');

                consoleError.mockRestore();
            });
        });
    });
});
