import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { MemoryRouter } from 'react-router';
import LanguageProvider, { useLanguage, type Language } from './LanguageContext';

const TestComponent = () => {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div>
            <div data-testid="language">{language}</div>
            <div data-testid="translation">{t('brand.name')}</div>
            <button onClick={() => setLanguage('ro')}>Set Romanian</button>
            <button onClick={() => setLanguage('es')}>Set Spanish</button>
            <button onClick={() => setLanguage('en')}>Set English</button>
        </div>
    );
};

const renderWithRouter = (initialPath = '/') => {
    return render(
        <MemoryRouter initialEntries={[initialPath]}>
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        </MemoryRouter>
    );
};

describe('LanguageContext', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('LanguageProvider', () => {
        describe('when no language is set', () => {
            it('defaults to English', () => {
                renderWithRouter('/');

                expect(screen.getByTestId('language')).toHaveTextContent('en');
            });

            it('translates using English messages', () => {
                renderWithRouter('/');

                expect(screen.getByTestId('translation')).toHaveTextContent('MoveIt');
            });
        });

        describe('when language is in URL path', () => {
            it('uses language from URL for Romanian', () => {
                renderWithRouter('/ro');

                expect(screen.getByTestId('language')).toHaveTextContent('ro');
            });

            it('uses language from URL for Spanish', () => {
                renderWithRouter('/es');

                expect(screen.getByTestId('language')).toHaveTextContent('es');
            });

            it('uses language from URL for French', () => {
                renderWithRouter('/fr');

                expect(screen.getByTestId('language')).toHaveTextContent('fr');
            });
        });

        describe('when language is stored in localStorage', () => {
            it('uses stored language when no URL language', () => {
                localStorage.setItem('language', 'de');

                renderWithRouter('/');

                expect(screen.getByTestId('language')).toHaveTextContent('de');
            });

            it('prefers URL language over stored language', () => {
                localStorage.setItem('language', 'de');

                renderWithRouter('/ro');

                expect(screen.getByTestId('language')).toHaveTextContent('ro');
            });
        });

        describe('when setLanguage is called', () => {
            it('updates language to Romanian', async () => {
                renderWithRouter('/');

                const button = screen.getByText('Set Romanian');

                await act(async () => {
                    button.click();
                });

                await waitFor(() => {
                    expect(screen.getByTestId('language')).toHaveTextContent('ro');
                });
            });

            it('updates language to Spanish', async () => {
                renderWithRouter('/');

                const button = screen.getByText('Set Spanish');

                await act(async () => {
                    button.click();
                });

                await waitFor(() => {
                    expect(screen.getByTestId('language')).toHaveTextContent('es');
                });
            });

            it('stores language in localStorage', async () => {
                renderWithRouter('/');

                const button = screen.getByText('Set Romanian');

                await act(async () => {
                    button.click();
                });

                await waitFor(() => {
                    expect(localStorage.getItem('language')).toBe('ro');
                });
            });
        });

        describe('t function', () => {
            it('returns translation for English', () => {
                renderWithRouter('/');

                expect(screen.getByTestId('translation')).toHaveTextContent('MoveIt');
            });

            it('returns translation for Romanian', () => {
                renderWithRouter('/ro');

                expect(screen.getByTestId('translation')).toHaveTextContent('MoveIt');
            });

            it('returns key when translation not found', () => {
                const TestComponentWithMissingKey = () => {
                    const { t } = useLanguage();

                    return <div data-testid="missing">{t('nonexistent.key')}</div>;
                };

                render(
                    <MemoryRouter initialEntries={['/']}>
                        <LanguageProvider>
                            <TestComponentWithMissingKey />
                        </LanguageProvider>
                    </MemoryRouter>
                );

                expect(screen.getByTestId('missing')).toHaveTextContent('nonexistent.key');
            });
        });

        describe('supported languages', () => {
            const testLanguage = (lang: Language) => {
                it(`supports ${lang}`, () => {
                    renderWithRouter(`/${lang}`);

                    expect(screen.getByTestId('language')).toHaveTextContent(lang);
                });
            };

            testLanguage('ro');
            testLanguage('es');
            testLanguage('fr');
            testLanguage('de');
            testLanguage('it');
            testLanguage('pt-BR');
            testLanguage('pt-PT');
            testLanguage('ru');
            testLanguage('zh-Hans');
            testLanguage('zh-Hant');
            testLanguage('ja');
            testLanguage('ko');
        });
    });

    describe('useLanguage', () => {
        describe('when used outside LanguageProvider', () => {
            it('throws an error', () => {
                const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

                expect(() => {
                    render(<TestComponent />);
                }).toThrow('useLanguage must be used within LanguageProvider');

                consoleError.mockRestore();
            });
        });
    });
});
