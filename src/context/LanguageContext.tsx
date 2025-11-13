/* Custom react-intl implementation to reduce bundle size, since we don't need all the features from react-intl library */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode, useCallback, useMemo, useEffect, useSyncExternalStore } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router';

import en from '../i18n/locales/en.json';
import ro from '../i18n/locales/ro.json';
import es from '../i18n/locales/es.json';
import fr from '../i18n/locales/fr.json';
import de from '../i18n/locales/de.json';
import it from '../i18n/locales/it.json';
import ptBR from '../i18n/locales/pt-BR.json';
import ptPT from '../i18n/locales/pt-PT.json';
import ru from '../i18n/locales/ru.json';
import zhHans from '../i18n/locales/zh-Hans.json';
import zhHant from '../i18n/locales/zh-Hant.json';
import ja from '../i18n/locales/ja.json';
import ko from '../i18n/locales/ko.json';

export type Language = 'en' | 'ro' | 'es' | 'fr' | 'de' | 'it' | 'pt-BR' | 'pt-PT' | 'ru' | 'zh-Hans' | 'zh-Hant' | 'ja' | 'ko';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
    en,
    ro,
    es,
    fr,
    de,
    it,
    'pt-BR': ptBR,
    'pt-PT': ptPT,
    ru,
    'zh-Hans': zhHans,
    'zh-Hant': zhHant,
    ja,
    ko
};

const useStoredLanguage = (): Language | null => useSyncExternalStore(
    (callback) => {
        globalThis.addEventListener('storage', callback);

        return () => globalThis.removeEventListener('storage', callback);
    },
    () => {
        try {
            return localStorage.getItem('language') as Language | null;
        } catch {
            return null;
        }
    },
    () => null
);

const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const routeLang = params.lang as Language | undefined;
    const storedLanguage = useStoredLanguage();

    const getLanguageFromURL = useCallback((): Language => {
        if (routeLang && Object.keys(translations).includes(routeLang)) {
            return routeLang;
        }

        const segments = location.pathname.split('/').filter(Boolean);
        const langSegment = segments.find(segment => Object.keys(translations).includes(segment));

        if (langSegment && Object.keys(translations).includes(langSegment)) {
            return langSegment as Language;
        }

        if (storedLanguage && Object.keys(translations).includes(storedLanguage)) {
            return storedLanguage;
        }

        return 'en';
    }, [routeLang, location.pathname, storedLanguage]);

    const [language, setLanguage] = useState<Language>(getLanguageFromURL);

    const setAndStoreLanguage = useCallback((lang: Language) => {
        if (globalThis.window !== undefined) localStorage.setItem('language', lang);

        const currentPath = location.pathname;
        const segments = currentPath.split('/').filter(Boolean);
        const supportedLangs = Object.keys(translations);
        const pathWithoutLang = segments.filter(seg => !supportedLangs.includes(seg));

        const newPath = lang === 'en'
            ? `/${pathWithoutLang.join('/')}`
            : `/${lang}/${pathWithoutLang.join('/')}`;

        navigate(newPath.replaceAll(/\/+/g, '/').replace(/\/$/, '') || '/');

        setLanguage(lang);
    }, [location.pathname, navigate]);

    const t = useCallback((key: string): string => translations[language]?.[key] || key, [language]);

    const valuesMemo = useMemo(() => ({
        language,
        setLanguage: setAndStoreLanguage,
        t
    }), [language, setAndStoreLanguage, t]);

    useEffect(() => {
        if (!routeLang && !storedLanguage && language === 'en') {
            if (globalThis.window === undefined) return;

            const browserLang = navigator.language.split('-')[0];
            const supportedLangs = Object.keys(translations);

            if (supportedLangs.includes(browserLang) && browserLang !== 'en') {
                navigate(`/${browserLang}`, { replace: true });
            }
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const urlLang = getLanguageFromURL();

        if (urlLang !== language) setLanguage(urlLang);
    }, [location.pathname, getLanguageFromURL]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <LanguageContext.Provider value={valuesMemo}>
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageProvider;

export const useLanguage = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }

    return context;
}
