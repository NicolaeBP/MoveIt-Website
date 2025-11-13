import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
    const { t, language } = useLanguage();

    const currentYear = new Date().getFullYear();
    const privacyPolicyUrl = 'https://nicolaebp.github.io/MoveIt-Website/PRIVACY_POLICY';

    return (
        <footer className="bg-gray-800 dark:bg-[#121212] text-white dark:text-[#E5E5E5] mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-white dark:text-[#E5E5E5]">
                            {t('brand.name')}
                        </h3>

                        <p className="text-gray-400 dark:text-[#B0B0B0]">
                            {t('footer.description')}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white dark:text-[#E5E5E5]">
                            {t('footer.quickLinks')}
                        </h4>

                        <ul className="space-y-2">
                            <li>
                                <Link to={language === 'en' ? '/' : `/${language}`} className="text-gray-400 dark:text-[#B0B0B0] hover:text-white dark:hover:text-[#E5E5E5] transition-colors">
                                    {t('nav.home')}
                                </Link>
                            </li>

                            <li>
                                <Link to={language === 'en' ? '/download' : `/${language}/download`} className="text-gray-400 dark:text-[#B0B0B0] hover:text-white dark:hover:text-[#E5E5E5] transition-colors">
                                    {t('nav.download')}
                                </Link>
                            </li>

                            <li>
                                <Link to={language === 'en' ? '/contact' : `/${language}/contact`} className="text-gray-400 dark:text-[#B0B0B0] hover:text-white dark:hover:text-[#E5E5E5] transition-colors">
                                    {t('nav.contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white dark:text-[#E5E5E5]">
                            {t('footer.legal')}
                        </h4>

                        <ul className="space-y-2">
                            <li>
                                <a
                                    href={privacyPolicyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 dark:text-[#B0B0B0] hover:text-white dark:hover:text-[#E5E5E5] transition-colors"
                                >
                                    {t('footer.privacyPolicy')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 dark:border-[#2D2D2D] mt-8 pt-8 text-center text-gray-400 dark:text-[#B0B0B0]">
                    <p>
                        {t('footer.copyright').replace('{year}', currentYear.toString())}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
