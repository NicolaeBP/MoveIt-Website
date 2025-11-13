import { Info } from 'lucide-react';
import type { GitHubRelease } from '../../../types/github';
import { GITHUB_RELEASES_URL } from '../Download.const';
import ErrorState from '../ErrorState/ErrorState';
import ReleaseCard from '../ReleaseCard/ReleaseCard';

interface DirectDownloadSectionProps {
    releases: GitHubRelease[];
    loading: boolean;
    error: string | null;
    t: (key: string) => string;
}

const DirectDownloadSection = ({ releases, loading, error, t }: DirectDownloadSectionProps) => {
    return (
        <section className="mb-20">
            <div className="bg-white dark:bg-[#2D2D2D] rounded-lg shadow-lg p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-[#E5E5E5] mb-4">
                    {t('download.directDownload.title')}
                </h2>

                <p className="text-lg text-gray-600 dark:text-[#B0B0B0] mb-8">
                    {t('download.directDownload.description')}
                </p>

                {loading && (
                    <output className="text-center py-8 block" aria-live="polite">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400" />

                        <p className="mt-4 text-gray-600 dark:text-[#B0B0B0]">
                            {t('download.directDownload.loading')}
                        </p>
                    </output>
                )}

                {error && (
                    <ErrorState
                        title={t('download.directDownload.error.title')}
                        message={t('download.directDownload.error.fallback')}
                        linkText={t('download.directDownload.error.link')}
                        linkUrl={GITHUB_RELEASES_URL}
                    />
                )}

                {!loading && !error && !releases.length && (
                    <p className="text-gray-600 dark:text-[#B0B0B0] text-center py-8">
                        {t('download.directDownload.noReleases')}
                    </p>
                )}

                {!loading && !error && !!releases.length && (
                    <div className="space-y-6">
                        {releases.slice(0, 3).map((release) => <ReleaseCard key={release.tag_name} release={release} t={t} />)}

                        <div className="text-center pt-4">
                            <a
                                href={GITHUB_RELEASES_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-700 dark:text-primary-400 hover:underline font-medium"
                            >
                                {t('download.directDownload.viewAllReleases')} →
                            </a>
                        </div>

                        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <div className="flex items-start gap-2 justify-center">
                                <Info className="w-5 h-5 text-blue-800 dark:text-blue-300 flex-shrink-0 mt-0.5" />

                                <p className="text-sm text-blue-800 dark:text-blue-300">
                                    {t('download.directDownload.windowsNote')}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DirectDownloadSection;
