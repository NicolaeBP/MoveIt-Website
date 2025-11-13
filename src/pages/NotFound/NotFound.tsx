import { Link } from 'react-router';
import { Home, Download, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Seo from '../../components/Seo/Seo';

const NotFound = () => {
    const { t, language } = useLanguage();

    const basePath = language === 'en' ? '' : `/${language}`;

    return (
        <>
            <Seo
                title={t('notFound.title')}
                description={t('notFound.description')}
                path={`${basePath}/404`}
            />

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-[#121212] dark:to-[#1E1E1E] flex items-center justify-center px-4 py-16">
                <div className="max-w-2xl w-full text-center">
                    <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                        404
                    </h1>

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-[#E5E5E5] mb-4">
                        {t('notFound.heading')}
                    </h2>

                    <p className="text-lg text-gray-600 dark:text-[#B0B0B0] mb-8 max-w-xl mx-auto">
                        {t('notFound.message')}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <Link
                            to={basePath || '/'}
                            className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-[#2D2D2D] rounded-lg shadow hover:bg-gray-100 dark:hover:bg-[#383838] transition-colors border border-gray-200 dark:border-[#383838]"
                        >
                            <Home className="w-5 h-5 text-primary-600 dark:text-primary-400" />

                            <span className="text-gray-900 dark:text-[#E5E5E5] font-medium">
                                {t('notFound.home')}
                            </span>
                        </Link>

                        <Link
                            to={`${basePath}/download`}
                            className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-[#2D2D2D] rounded-lg shadow hover:bg-gray-100 dark:hover:bg-[#383838] transition-colors border border-gray-200 dark:border-[#383838]"
                        >
                            <Download className="w-5 h-5 text-primary-600 dark:text-primary-400" />

                            <span className="text-gray-900 dark:text-[#E5E5E5] font-medium">
                                {t('notFound.download')}
                            </span>
                        </Link>

                        <Link
                            to={`${basePath}/contact`}
                            className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-[#2D2D2D] rounded-lg shadow hover:bg-gray-100 dark:hover:bg-[#383838] transition-colors border border-gray-200 dark:border-[#383838]"
                        >
                            <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />

                            <span className="text-gray-900 dark:text-[#E5E5E5] font-medium">
                                {t('notFound.contact')}
                            </span>
                        </Link>
                    </div>

                    <Link
                        to={basePath || '/'}
                        className="inline-block px-8 py-3 bg-primary-600 dark:bg-primary-700 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors font-semibold shadow-lg"
                    >
                        {t('notFound.backHome')}
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NotFound;
