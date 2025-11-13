import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Settings from '../Settings/Settings';

const navItems = [
    { path: '/', labelKey: 'nav.home' },
    { path: '/download', labelKey: 'nav.download' },
    { path: '/contact', labelKey: 'nav.contact' },
];

const Header = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const { t, language } = useLanguage();

    const toggleSetIsSettingsOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSettingsOpen(prevState => !prevState);
    };

    const getLocalizedPath = (path: string): string => language === 'en' ? path : `/${language}${path}`;

    return (
        <header className="bg-gray-800 dark:bg-[#1E1E1E] shadow-sm sticky top-0 z-40">
            <nav className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to={getLocalizedPath('/')} className="flex items-center space-x-2">
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                            {t('brand.name')}
                        </span>
                    </Link>

                    <div className="flex space-x-2 sm:space-x-4 lg:space-x-8 items-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={getLocalizedPath(item.path)}
                                className="text-base text-gray-300 dark:text-[#E5E5E5] hover:text-primary-400 dark:hover:text-[#60C5F5] transition-colors"
                            >
                                {t(item.labelKey)}
                            </Link>
                        ))}

                        <div className="relative flex items-center">
                            <button
                                onClick={toggleSetIsSettingsOpen}
                                className="text-gray-300 dark:text-[#E5E5E5] hover:text-primary-400 dark:hover:text-[#60C5F5] transition-colors"
                                aria-label={t('nav.settings')}
                                aria-haspopup="true"
                                aria-expanded={isSettingsOpen}
                            >
                                <SettingsIcon className="w-6 h-6 transition-transform duration-300 ease-in-out hover:rotate-45" />
                            </button>

                            <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
