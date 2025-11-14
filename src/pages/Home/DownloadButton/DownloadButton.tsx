interface DownloadButtonProps {
    isWindows: boolean;
    loading: boolean;
    downloadUrl: string | null;
    t: (key: string) => string;
    inline?: boolean;
}

const DownloadButton = ({ isWindows, loading, downloadUrl, t, inline = false }: DownloadButtonProps) => {
    const inlineClass = inline ? 'inline-block' : '';

    return (
        <>
            {loading && (
                <button
                    disabled
                    className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold opacity-60 cursor-wait"
                >
                    {t('home.hero.loading')}
                </button>
            )}

            {!loading && downloadUrl && (
                <a
                    href={downloadUrl}
                    className={`bg-gradient-to-br from-white to-gray-300 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:from-gray-100 hover:to-gray-400 transition-all ${inlineClass}`}
                >
                    {t('home.hero.downloadLatest')}
                </a>
            )}

            {!loading && !downloadUrl && isWindows && (
                <button
                    disabled
                    className="bg-gray-200 text-gray-500 px-8 py-3 rounded-lg font-semibold cursor-not-allowed opacity-60"
                    title={t('home.hero.windowsComingSoon')}
                >
                    {t('home.hero.windowsComingSoon')}
                </button>
            )}

            {!loading && !downloadUrl && !isWindows && (
                <a
                    href="/download"
                    className={`bg-gradient-to-br from-white to-gray-300 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:from-gray-100 hover:to-gray-400 transition-all ${inlineClass}`}
                >
                    {t('home.hero.viewDownloads')}
                </a>
            )}
        </>
    );
};

export default DownloadButton;
