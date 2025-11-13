import { Sun, Moon, Lightbulb } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage, type Language } from '../../context/LanguageContext';
import React, { useEffect, useRef } from 'react';

interface SettingsProps {
    isOpen: boolean;
    onClose: () => void;
}

const Settings = ({ isOpen, onClose }: SettingsProps) => {
    const { theme, setTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const clickOutsideRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            const handleEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();

            const handleClickOutside = (event: MouseEvent) => {
                if (clickOutsideRef.current && !clickOutsideRef.current.contains(event.target as Node)) {
                    onClose();
                }
            };

            document.addEventListener('keydown', handleEscape);
            document.addEventListener('click', handleClickOutside);

            return () => {
                document.removeEventListener('keydown', handleEscape);
                document.removeEventListener('click', handleClickOutside);
            }
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const themeIcons: Record<'light' | 'dark' | 'auto', React.ReactNode> = {
        light: <Sun className="w-6 h-6" />,
        dark: <Moon className="w-6 h-6" />,
        auto: <Lightbulb className="w-6 h-6" />,
    };

    const languages: { code: Language; name: string }[] = [
        { code: 'en', name: t('language.en') },
        { code: 'ro', name: t('language.ro') },
        { code: 'es', name: t('language.es') },
        { code: 'fr', name: t('language.fr') },
        { code: 'de', name: t('language.de') },
        { code: 'it', name: t('language.it') },
        { code: 'pt-BR', name: t('language.pt-BR') },
        { code: 'pt-PT', name: t('language.pt-PT') },
        { code: 'ru', name: t('language.ru') },
        { code: 'zh-Hans', name: t('language.zh-Hans') },
        { code: 'zh-Hant', name: t('language.zh-Hant') },
        { code: 'ja', name: t('language.ja') },
        { code: 'ko', name: t('language.ko') },
    ];

    const getThemeButtonClasses = (themeOption: string): string => {
        if (themeOption === theme) {
            return 'border-primary-600 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300';
        }

        return 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 text-gray-700 dark:text-gray-300';
    };

    return (
        <div
            className="absolute top-full right-0 xxl:left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-2 border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
            role="menu"
            aria-label={t('settings.title')}
            ref={clickOutsideRef}
        >
            <div className="bg-primary-700 dark:bg-primary-800 px-4 py-2">
                <h2 className="text-lg font-bold text-white">
                    {t('settings.title')}
                </h2>
            </div>

            <div className="p-4 space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {t('settings.theme')}
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                        {(['light', 'dark', 'auto'] as const).map((themeOption) => (
                            <button
                                key={themeOption}
                                onClick={() => setTheme(themeOption)}
                                className={`px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${getThemeButtonClasses(themeOption)}`}
                            >
                                <div className="flex flex-col items-center space-y-2">
                                    {themeIcons[themeOption]}

                                    <span className="text-xs font-medium leading-tight">
                                        {t(`theme.${themeOption}`)}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="language-select" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {t('settings.language')}
                    </label>

                    <select
                        id="language-select"
                        name="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors pr-8"
                    >
                        {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Settings;
