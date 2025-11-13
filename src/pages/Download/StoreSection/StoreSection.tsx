import React from 'react';
import { Check } from 'lucide-react';

interface StoreSectionProps {
    title: string;
    description: string;
    features?: string[];
    text: string;
    href?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    decorativeIcon?: React.ReactNode;
    reverse?: boolean;
}

const StoreSection = ({
    title,
    description,
    features = [],
    text,
    href,
    icon,
    disabled = false,
    decorativeIcon,
    reverse = false,
}: StoreSectionProps) => {
    const Component = href ? 'a' : 'button';

    const componentProps = href
        ? { href, target: '_blank', rel: 'noopener noreferrer' }
        : { disabled };

    return (
        <section className="mb-20">
            <div className="bg-white dark:bg-[#2D2D2D] rounded-lg shadow-lg p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {decorativeIcon && (
                        <div className={`hidden md:flex justify-center items-center ${reverse ? 'order-1' : 'order-2'}`}>
                            {decorativeIcon}
                        </div>
                    )}

                    <div className={reverse ? 'order-2' : 'order-1'}>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-[#E5E5E5] mb-4">
                            {title}
                        </h2>

                        <p className="text-lg text-gray-600 dark:text-[#B0B0B0] mb-6">
                            {description}
                        </p>

                        {!!features.length && (
                            <ul className="space-y-3 text-gray-600 dark:text-[#B0B0B0] mb-8">
                                {features.map((feature) => (
                                    <li key={`${feature}`} className="flex items-start">
                                        <Check className="w-6 h-6 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />

                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <Component
                            {...componentProps}
                            className={`inline-flex items-center px-6 py-3 rounded-lg transition-colors ${
                                disabled
                                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                    : 'bg-black text-white hover:bg-gray-800'
                            }`}
                        >
                            {icon && <span className="mr-3">{icon}</span>}

                            {text}
                        </Component>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StoreSection;
