import { Download, ChevronRight } from 'lucide-react';
import type { GitHubRelease } from '../../../types/github';
import { formatDate, formatFileSize, extractSections } from '../Download.utils';

interface ReleaseCardProps {
    release: GitHubRelease;
    t: (key: string) => string;
}

const ReleaseCard = ({ release, t }: ReleaseCardProps) => {
    const sections = extractSections(release.body);

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-[#1E1E1E]">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-[#E5E5E5]">
                    {release.name || release.tag_name}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('download.directDownload.releasedOn').replace('{date}', formatDate(release.published_at))}
                </p>
            </div>

            {!!sections.length && (
                <div className="mb-4 space-y-3 text-sm">
                    {sections.map(({ title, content }) => (
                        <div key={title}>
                            <h4 className="font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
                                {title}
                            </h4>

                            <p className="text-gray-600 dark:text-[#B0B0B0] whitespace-pre-line text-sm">
                                {content}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {Boolean(release?.assets?.length) ? (
                <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {t('download.directDownload.downloadsLabel')}
                    </p>

                    {release.assets.map((asset) => (
                        <a
                            key={asset.name}
                            href={asset.browser_download_url}
                            className="flex items-center justify-between p-3 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
                        >
                            <div className="flex items-center">
                                <Download className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3" />

                                <div>
                                    <p className="font-medium text-gray-900 dark:text-[#E5E5E5]">
                                        {asset.name}
                                    </p>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {formatFileSize(asset.size)} • {t('download.directDownload.downloadCount').replace('{count}', asset.download_count.toString())}
                                    </p>
                                </div>
                            </div>

                            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        </a>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {t('download.directDownload.noAssets')}
                </p>
            )}
        </div>
    );
};

export default ReleaseCard;
