import React from 'react';
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    Navigate,
    isRouteErrorResponse,
    useRouteError,
    useLocation,
} from 'react-router';
import ThemeProvider from '../src/context/ThemeContext';
import LanguageProvider, { useLanguage, type Language } from '../src/context/LanguageContext';
import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';
import '../src/index.css';

const detectLanguageFromPathname = (pathname: string): Language => {
    const supportedLangs = new Set<Language>(['ro', 'es', 'fr', 'de', 'it', 'pt-BR', 'pt-PT', 'ru', 'zh-Hans', 'zh-Hant', 'ja', 'ko']);
    const segments = pathname.split('/').filter(Boolean);
    const langSegment = segments.find(seg => supportedLangs.has(seg as Language));

    return (langSegment as Language) || 'en';
};

// eslint-disable-next-line react-refresh/only-export-components
export const links = () => {
    const baseUrl = import.meta.env.BASE_URL.endsWith('/')
        ? import.meta.env.BASE_URL
        : `${import.meta.env.BASE_URL}/`;

    return [
        {
            rel: "icon",
            href: `${baseUrl}favicon.ico`,
            type: "image/x-icon",
        },
        {
            rel: "icon",
            href: `${baseUrl}favicon.png`,
            type: "image/png",
        },
    ];
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const lang = detectLanguageFromPathname(location.pathname);

    return (
        <html lang={lang}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link rel="preconnect" href="https://api.github.com" />
                <link rel="dns-prefetch" href="https://api.github.com" />
                <title>MoveIt - Professional Mouse Automation</title>

                <Meta />
                <Links />
            </head>

            <body>
                <ThemeProvider>
                    <LanguageProvider>
                        {children}
                    </LanguageProvider>
                </ThemeProvider>

                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

const Root = () => (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Header />

        <main className="flex-grow">
            <Outlet />
        </main>

        <Footer />
    </div>
);

export const HydrateFallback = () => {
    const { t } = useLanguage();

    return <div>{t('hydrate.loading')}</div>;
}

export const ErrorBoundary = () => {
    const error = useRouteError();
    const { t } = useLanguage();

    if (isRouteErrorResponse(error) && error.status === 404) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="text-center p-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('error.heading')}
                </h1>

                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    {error instanceof Error ? error.message : t('error.message')}
                </p>

                <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                    {t('error.returnHome')}
                </a>
            </div>
        </div>
    );
}

export default Root;
