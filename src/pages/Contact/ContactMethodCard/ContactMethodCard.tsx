import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

interface ContactMethodCardProps {
    href: string;
    icon: React.ReactNode;
    labelKey: string;
    valueKey: string;
    external?: boolean;
}

const ContactMethodCard = ({ href, icon, labelKey, valueKey, external = false }: ContactMethodCardProps) => {
    const { t } = useLanguage();
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

    return (
        <a
            href={href}
            {...externalProps}
            className="flex items-start p-4 sm:p-6 bg-gray-50 dark:bg-[#1E1E1E] hover:bg-primary-50 dark:hover:bg-[#383838] rounded-lg transition-colors group"
        >
            <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                    {icon}
                </div>
            </div>

            <div className="ml-3 sm:ml-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">
                    {t(labelKey)}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 dark:text-[#B0B0B0] break-words">
                    {t(valueKey)}
                </p>
            </div>
        </a>
    );
};

export default ContactMethodCard;
