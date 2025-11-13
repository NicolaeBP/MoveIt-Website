import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

interface SupportSectionProps {
    icon: React.ReactNode;
    iconColor: 'blue' | 'green' | 'purple';
    titleKey: string;
    descriptionKey: string;
    linkTextKey: string;
    linkHref: string;
}

const SupportSection = ({
    icon,
    iconColor,
    titleKey,
    descriptionKey,
    linkTextKey,
    linkHref,
}: SupportSectionProps) => {
    const { t } = useLanguage();

    const colorClasses = {
        blue: {
            container: 'bg-blue-100 dark:bg-blue-900/30',
            icon: 'text-blue-600 dark:text-blue-400',
        },
        green: {
            container: 'bg-green-100 dark:bg-green-900/30',
            icon: 'text-green-600 dark:text-green-400',
        },
        purple: {
            container: 'bg-purple-100 dark:bg-purple-900/30',
            icon: 'text-purple-600 dark:text-purple-400',
        },
    };

    const colors = colorClasses[iconColor];

    const [before, after] = t(descriptionKey).split('{link}');

    return (
        <div className="flex items-start">
            <div className="flex-shrink-0">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colors.container} rounded-lg flex items-center justify-center`}>
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.icon}`}>
                        {icon}
                    </div>
                </div>
            </div>

            <div className="ml-3 sm:ml-4 md:ml-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
                    {t(titleKey)}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 dark:text-[#B0B0B0]">
                    {before}

                    <a
                        href={linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-700 underline dark:text-primary-400 hover:text-primary-500"
                    >
                        {t(linkTextKey)}
                    </a>

                    {after}
                </p>
            </div>
        </div>
    );
};

export default SupportSection;
