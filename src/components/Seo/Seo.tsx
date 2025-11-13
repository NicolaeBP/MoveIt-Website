import { useLanguage } from '../../context/LanguageContext';

interface SeoProps {
    title: string;
    description: string;
    ogType?: string;
    path?: string;
}

const Seo = ({
    title,
    description,
    ogType = 'website',
    path = '/'
}: SeoProps) => {
    const { t, language } = useLanguage();

    const fullTitle = `${title} | ${t('brand.name')}`;
    const siteUrl = 'https://nicolaebp.github.io/MoveIt';
    const langPrefix = language === 'en' ? '' : `/${language}`;
    const canonicalUrl = `${siteUrl}${langPrefix}${path}`;
    const languages = ['en', 'ro', 'es', 'fr', 'de', 'it', 'pt-BR', 'pt-PT', 'ru', 'zh-Hans', 'zh-Hant', 'ja', 'ko'];
    const ogLocale = language.replaceAll('-', '_');

    return (
        <>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:locale" content={ogLocale} />
            <meta property="og:site_name" content="MoveIt" />
            <meta property="og:image" content={`${siteUrl}/og-image.png`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
            <meta name="twitter:image:alt" content={title} />

            {/* Additional SEO */}
            <meta name="robots" content="index, follow" />
            <meta name="author" content={t('seo.author')} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Hreflang tags for multilingual support */}
            {languages.map((lang) => {
                // English uses a root path without a prefix
                const langPath = lang === 'en' ? path : `/${lang}${path}`;

                return (
                    <link
                        key={lang}
                        rel="alternate"
                        hrefLang={lang}
                        href={`${siteUrl}${langPath}`}
                    />
                );
            })}
            <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />
        </>
    );
};

export default Seo;
