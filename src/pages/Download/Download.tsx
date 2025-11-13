import { useState, useEffect } from 'react';
import { Apple, Monitor } from 'lucide-react';
import { JsonLd } from 'react-schemaorg';
import Seo from '../../components/Seo/Seo';
import { useLanguage } from '../../context/LanguageContext';
import { useValidateLanguage } from '../../hooks/useValidateLanguage';
import type { GitHubRelease } from '../../types/github';
import { isMobileOrTablet, getDownloadSeoData } from './Download.utils';
import { MAC_APP_STORE_URL, GITHUB_RELEASES_API_URL } from './Download.const';
import DirectDownloadSection from './DirectDownloadSection/DirectDownloadSection';
import InstallationInstructions from './InstallationInstructions/InstallationInstructions';
import StoreSection from './StoreSection/StoreSection';

const Download = () => {
    const [releases, setReleases] = useState<GitHubRelease[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { t, language } = useLanguage();
    const NotFound = useValidateLanguage();
    const isMobile = isMobileOrTablet();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(GITHUB_RELEASES_API_URL);

                if (!response.ok) {
                    throw new Error('Failed to fetch releases');
                }

                const data: GitHubRelease[] = await response.json();

                setReleases(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        })()
    }, []);

    if (NotFound) return NotFound;

    if (isMobile) {
        return (
            <>
                <Seo
                    title={t('seo.download.title')}
                    description={t('seo.download.description')}
                    path={language === 'en' ? '/download' : `/${language}/download`}
                />

                <JsonLd item={getDownloadSeoData(t('seo.download.description'))} />

                <div className="relative min-h-screen py-16 bg-gradient-to-b from-gray-50 to-white dark:from-[#121212] dark:to-[#1E1E1E] overflow-hidden">
                    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl font-bold text-gray-900 dark:text-[#E5E5E5] mb-8">
                            {t('download.desktopOnly.title')}
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-[#B0B0B0] leading-relaxed">
                            {t('download.desktopOnly.message')}
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Seo
                title={t('seo.download.title')}
                description={t('seo.download.description')}
                path={language === 'en' ? '/download' : `/${language}/download`}
            />

            <JsonLd item={getDownloadSeoData(t('seo.download.description'))} />

            <div className="relative min-h-screen py-16 bg-gradient-to-b from-gray-50 to-white dark:from-[#121212] dark:to-[#1E1E1E] overflow-hidden">
                {/* Organic fluid shapes */}
                <svg aria-hidden="true" className="absolute top-0 right-0 w-[900px] h-[900px] opacity-[0.15] dark:opacity-[0.08]" viewBox="0 0 200 200">
                    <path fill="#d1d5db" className="dark:fill-[#2D2D2D]" d="M41.2,-71.8C53.7,-64.3,64.3,-53.4,71.4,-40.2C78.5,-27,82.1,-11.5,81.3,3.7C80.5,18.9,75.3,33.8,66.8,46.3C58.3,58.8,46.5,68.9,33.1,75.3C19.7,81.7,4.7,84.4,-10.8,84.1C-26.3,83.8,-42.2,80.5,-55.8,73.1C-69.4,65.7,-80.7,54.2,-85.9,40.2C-91.1,26.2,-90.2,9.7,-86.4,-5.3C-82.6,-20.3,-75.9,-33.8,-66.4,-44.8C-56.9,-55.8,-44.6,-64.3,-31.6,-71.5C-18.6,-78.7,-5,-84.6,7.4,-95.6C19.8,-106.6,39.6,-122.7,41.2,-71.8Z" transform="translate(100 100)" />
                </svg>

                <svg aria-hidden="true" className="absolute bottom-0 left-0 w-[800px] h-[800px] opacity-[0.18] dark:opacity-[0.08]" viewBox="0 0 200 200">
                    <path fill="#d1d5db" className="dark:fill-[#2D2D2D]" d="M39.5,-65.4C51.4,-58.5,61.5,-47.9,68.3,-35.4C75.1,-22.9,78.6,-8.5,77.8,5.5C77,19.5,71.9,33.1,63.4,44.3C54.9,55.5,43,64.3,29.8,69.8C16.6,75.3,2.1,77.5,-13.2,76.9C-28.5,76.3,-44.6,72.9,-57.3,65.1C-70,57.3,-79.3,45.1,-83.8,31.4C-88.3,17.7,-88,2.5,-84.2,-11.5C-80.4,-25.5,-73.1,-38.3,-62.7,-46.5C-52.3,-54.7,-38.8,-58.3,-25.7,-64.8C-12.6,-71.3,0.1,-80.7,13.7,-83.4C27.3,-86.1,54.6,-82.1,39.5,-65.4Z" transform="translate(100 100)" />
                </svg>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-gray-900 dark:text-[#E5E5E5] mb-4">
                            {t('download.hero.title')}
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-[#B0B0B0]">
                            {t('download.hero.description')}
                        </p>
                    </div>

                    <StoreSection
                        title={t('download.macAppStore.title')}
                        description={t('download.macAppStore.description')}
                        features={[
                            t('download.macAppStore.feature1'),
                            t('download.macAppStore.feature2'),
                            t('download.macAppStore.feature3'),
                        ]}
                        text={t('download.macAppStore.button')}
                        href={MAC_APP_STORE_URL}
                        icon={
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                        }
                        decorativeIcon={<Apple className="w-24 h-24 text-gray-900 dark:text-gray-100" />}
                    />

                    <StoreSection
                        title={t('download.windowsStore.title')}
                        description={t('download.windowsStore.description')}
                        text={t('download.windowsStore.button')}
                        disabled
                        decorativeIcon={<Monitor className="w-24 h-24 text-gray-400 dark:text-gray-600" />}
                        reverse
                    />

                    <DirectDownloadSection
                        releases={releases}
                        loading={loading}
                        error={error}
                        t={t}
                    />

                    <InstallationInstructions t={t} />
                </div>
            </div>
        </>
    );
};

export default Download;
