import { useState, useEffect } from 'react';
import { Video, FlaskConical, Settings, Monitor, Users, BarChart } from 'lucide-react';
import { JsonLd } from 'react-schemaorg';
import Seo from '../../components/Seo/Seo';
import { useLanguage } from '../../context/LanguageContext';
import { useValidateLanguage } from '../../hooks/useValidateLanguage';
import { detectOS, fetchLatestRelease, findAssetForOS, getHomeSeoData } from './Home.utils';
import DownloadButton from './DownloadButton/DownloadButton';
import FeatureCard from './FeatureCard/FeatureCard';
import UseCaseCard from './UseCaseCard/UseCaseCard';
import smartSchedule from '../../assets/images/screenshots/smart-scheduling.webp';
import respectsYourSchedule from '../../assets/images/screenshots/respects-your-schedule.webp';
import continuesAfterSleep from '../../assets/images/screenshots/continues-after-sleep.webp';
import languageSelection from '../../assets/images/screenshots/language-selection.webp';
import privacyAndSecurity from '../../assets/images/screenshots/privacy-and-security.webp';
import smartScheduleDark from '../../assets/images/screenshots/smart-scheduling-dark.webp';
import respectsYourScheduleDark from '../../assets/images/screenshots/respects-your-schedule-dark.webp';
import continuesAfterSleepDark from '../../assets/images/screenshots/continues-after-sleep-dark.webp';
import languageSelectionDark from '../../assets/images/screenshots/language-selection-dark.webp';
import privacyAndSecurityDark from '../../assets/images/screenshots/privacy-and-security-dark.webp';

const Home = () => {
    const { t, language } = useLanguage();
    const NotFound = useValidateLanguage();

    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [isWindows, setIsWindows] = useState(false);
    const [loading, setLoading] = useState(true);
    const [release, setRelease] = useState<Awaited<ReturnType<typeof fetchLatestRelease>>>(null);

    useEffect(() => {
        const os = detectOS();

        setIsWindows(os === 'windows');

        fetchLatestRelease()
            .then((fetchedRelease) => {
                if (fetchedRelease) {
                    setRelease(fetchedRelease);

                    const asset = findAssetForOS(fetchedRelease, os);

                    if (asset) setDownloadUrl(asset.browser_download_url);
                }
            })
            .catch((error) => console.error('Failed to fetch latest release:', error))
            .finally(() => setLoading(false));
    }, []);

    if (NotFound) return NotFound;

    return (
        <>
            <Seo
                title={t('seo.home.title')}
                description={t('seo.home.description')}
                path={language === 'en' ? '/' : `/${language}/`}
            />

            <JsonLd item={getHomeSeoData(t('seo.home.description'), release)} />

            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="bg-primary-700 dark:bg-primary-800 text-white dark:text-[#E5E5E5] py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-5xl md:text-6xl font-bold text-white dark:text-[#E5E5E5] mb-2">
                                {t('home.hero.title')}
                            </h1>

                            <p className="text-2xl md:text-3xl text-white dark:text-[#E5E5E5] mb-6">
                                {t('home.hero.subtitle')}
                            </p>

                            <p className="text-lg md:text-xl text-white dark:text-[#E5E5E5]/90 mb-8">
                                {t('home.hero.tagline')}
                            </p>

                            <p className="text-lg text-white dark:text-[#E5E5E5]/90 max-w-3xl mx-auto mb-10">
                                {t('home.hero.description')}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <DownloadButton
                                    isWindows={isWindows}
                                    loading={loading}
                                    downloadUrl={downloadUrl}
                                    t={t}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-[#121212] dark:to-[#1E1E1E] border-t border-gray-200/50 dark:border-[#2D2D2D] overflow-hidden">
                    {/* Organic fluid shapes */}
                    <svg aria-hidden="true" className="absolute top-0 left-0 w-[800px] h-[800px] opacity-[0.18] dark:opacity-[0.08]" viewBox="0 0 200 200">
                        <path fill="#d1d5db" className="dark:fill-[#2D2D2D]" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,39.9,75.8C26,82.6,9.2,83.6,-6.5,83.3C-22.2,83,-36.8,81.4,-50.3,74.6C-63.8,67.8,-76.2,55.8,-82.8,41.2C-89.4,26.6,-90.2,9.4,-87.7,-6.5C-85.2,-22.4,-79.4,-37,-69.8,-48.9C-60.2,-60.8,-46.8,-70,-32.5,-76.9C-18.2,-83.8,-9.1,-88.4,2.9,-93.1C14.9,-97.8,29.8,-102.6,44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>

                    <svg aria-hidden="true" className="absolute top-1/3 right-0 w-[900px] h-[900px] opacity-[0.15] dark:opacity-[0.08]" viewBox="0 0 200 200">
                        <path fill="#d1d5db" className="dark:fill-[#2D2D2D]" d="M39.5,-65.4C51.4,-58.5,61.5,-47.9,68.3,-35.4C75.1,-22.9,78.6,-8.5,77.8,5.5C77,19.5,71.9,33.1,63.4,44.3C54.9,55.5,43,64.3,29.8,69.8C16.6,75.3,2.1,77.5,-13.2,76.9C-28.5,76.3,-44.6,72.9,-57.3,65.1C-70,57.3,-79.3,45.1,-83.8,31.4C-88.3,17.7,-88,2.5,-84.2,-11.5C-80.4,-25.5,-73.1,-38.3,-62.7,-46.5C-52.3,-54.7,-38.8,-58.3,-25.7,-64.8C-12.6,-71.3,0.1,-80.7,13.7,-83.4C27.3,-86.1,54.6,-82.1,39.5,-65.4Z" transform="translate(100 100)" />
                    </svg>

                    <svg aria-hidden="true" className="absolute bottom-0 left-0 w-[850px] h-[850px] opacity-[0.18] dark:opacity-[0.08]" viewBox="0 0 200 200">
                        <path fill="#d1d5db" className="dark:fill-[#2D2D2D]" d="M41.2,-71.8C53.7,-64.3,64.3,-53.4,71.4,-40.2C78.5,-27,82.1,-11.5,81.3,3.7C80.5,18.9,75.3,33.8,66.8,46.3C58.3,58.8,46.5,68.9,33.1,75.3C19.7,81.7,4.7,84.4,-10.8,84.1C-26.3,83.8,-42.2,80.5,-55.8,73.1C-69.4,65.7,-80.7,54.2,-85.9,40.2C-91.1,26.2,-90.2,9.7,-86.4,-5.3C-82.6,-20.3,-75.9,-33.8,-66.4,-44.8C-56.9,-55.8,-44.6,-64.3,-31.6,-71.5C-18.6,-78.7,-5,-84.6,7.4,-95.6C19.8,-106.6,39.6,-122.7,41.2,-71.8Z" transform="translate(100 100)" />
                    </svg>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-[#E5E5E5] mb-16">
                            {t('home.features.title')}
                        </h2>

                        {/* Feature 1: Smart Scheduling */}
                        <FeatureCard
                            title={t('home.features.scheduling.title')}
                            description={t('home.features.scheduling.description')}
                            items={[
                                t('home.features.scheduling.item1'),
                                t('home.features.scheduling.item2'),
                                t('home.features.scheduling.item3'),
                                t('home.features.scheduling.item4'),
                            ]}
                            lightSrc={smartSchedule}
                            darkSrc={smartScheduleDark}
                            alt={t('home.features.scheduling.altText')}
                            width={908}
                            height={1166}
                            isLCP
                        />

                        {/* Feature 2: Respects Your Schedule */}
                        <FeatureCard
                            title={t('home.features.respects.title')}
                            description={t('home.features.respects.description')}
                            items={[
                                t('home.features.respects.item1'),
                                t('home.features.respects.item2'),
                                t('home.features.respects.item3'),
                                t('home.features.respects.item4'),
                            ]}
                            lightSrc={respectsYourSchedule}
                            darkSrc={respectsYourScheduleDark}
                            alt={t('home.features.respects.altText')}
                            width={872}
                            height={1148}
                            reversed
                        />

                        {/* Feature 3: Wake from Sleep */}
                        <FeatureCard
                            title={t('home.features.wakeFromSleep.title')}
                            description={t('home.features.wakeFromSleep.description')}
                            items={[
                                t('home.features.wakeFromSleep.item1'),
                                t('home.features.wakeFromSleep.item2'),
                                t('home.features.wakeFromSleep.item3'),
                                t('home.features.wakeFromSleep.item4'),
                            ]}
                            lightSrc={continuesAfterSleep}
                            darkSrc={continuesAfterSleepDark}
                            alt={t('home.features.wakeFromSleep.altText')}
                            width={896}
                            height={1156}
                        />

                        {/* Feature 4: Auto Language Detection */}
                        <FeatureCard
                            title={t('home.features.multilingual.title')}
                            description={t('home.features.multilingual.description')}
                            items={[
                                t('home.features.multilingual.item1'),
                                t('home.features.multilingual.item2'),
                                t('home.features.multilingual.item3'),
                                t('home.features.multilingual.item4'),
                            ]}
                            lightSrc={languageSelection}
                            darkSrc={languageSelectionDark}
                            alt={t('home.features.multilingual.altText')}
                            width={880}
                            height={1154}
                            reversed
                        />

                        {/* Feature 5: Privacy First */}
                        <FeatureCard
                            title={t('home.features.privacy.title')}
                            description={t('home.features.privacy.description')}
                            items={[
                                t('home.features.privacy.item1'),
                                t('home.features.privacy.item2'),
                                t('home.features.privacy.item3'),
                                t('home.features.privacy.item4'),
                            ]}
                            lightSrc={privacyAndSecurity}
                            darkSrc={privacyAndSecurityDark}
                            alt={t('home.features.privacy.altText')}
                            width={872}
                            height={1144}
                        />
                    </div>
                </section>

                {/* Use Cases Section */}
                <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-[#1E1E1E] dark:to-[#121212] border-t border-gray-200/50 dark:border-[#2D2D2D] overflow-hidden">
                    {/* Organic fluid shapes */}
                    <svg aria-hidden="true" className="absolute top-0 right-0 w-[900px] h-[900px] opacity-[0.15] dark:opacity-[0.08]" viewBox="0 0 200 200">
                        <path fill="#d1d5db" className="dark:fill-[#2D2D2D]" d="M47.3,-78.7C61.1,-71.3,71.8,-56.4,78.2,-40.2C84.6,-24,86.7,-6.5,84.3,10.1C81.9,26.7,75,42.4,64.8,54.8C54.6,67.2,41.1,76.3,25.9,81.2C10.7,86.1,-6.2,86.8,-21.8,82.9C-37.4,79,-51.7,70.5,-63.3,58.7C-74.9,46.9,-83.8,31.8,-86.4,15.4C-89,-1,-85.3,-18.7,-77.4,-33.9C-69.5,-49.1,-57.4,-61.8,-43.2,-68.9C-29,-76,-14.5,-77.5,1.5,-80.1C17.5,-82.7,35,-86.4,47.3,-78.7Z" transform="translate(100 100)" />
                    </svg>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-[#E5E5E5] mb-16">
                            {t('home.useCases.title')}
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            <UseCaseCard
                                icon={<Video className="w-12 h-12 text-primary-600 dark:text-primary-400" />}
                                title={t('home.useCases.remotePresentations.title')}
                                description={t('home.useCases.remotePresentations.description')}
                            />

                            <UseCaseCard
                                icon={<FlaskConical className="w-12 h-12 text-primary-600 dark:text-primary-400" />}
                                title={t('home.useCases.softwareTesting.title')}
                                description={t('home.useCases.softwareTesting.description')}
                            />

                            <UseCaseCard
                                icon={<Settings className="w-12 h-12 text-primary-600 dark:text-primary-400" />}
                                title={t('home.useCases.longProcesses.title')}
                                description={t('home.useCases.longProcesses.description')}
                            />

                            <UseCaseCard
                                icon={<Monitor className="w-12 h-12 text-primary-600 dark:text-primary-400" />}
                                title={t('home.useCases.remoteDesktop.title')}
                                description={t('home.useCases.remoteDesktop.description')}
                            />

                            <UseCaseCard
                                icon={<Users className="w-12 h-12 text-primary-600 dark:text-primary-400" />}
                                title={t('home.useCases.accessibility.title')}
                                description={t('home.useCases.accessibility.description')}
                            />

                            <UseCaseCard
                                icon={<BarChart className="w-12 h-12 text-primary-600 dark:text-primary-400" />}
                                title={t('home.useCases.dataMonitoring.title')}
                                description={t('home.useCases.dataMonitoring.description')}
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-primary-700 dark:bg-primary-800 text-white dark:text-[#E5E5E5]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold mb-6 text-white dark:text-[#E5E5E5]">
                            {t('home.cta.title')}
                        </h2>

                        <p className="text-xl mb-8 text-white dark:text-[#E5E5E5]">
                            {t('home.cta.description')}
                        </p>

                        <DownloadButton
                            isWindows={isWindows}
                            loading={loading}
                            downloadUrl={downloadUrl}
                            t={t}
                            inline
                        />
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;
