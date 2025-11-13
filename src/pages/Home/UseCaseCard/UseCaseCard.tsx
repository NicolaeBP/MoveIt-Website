import React from 'react';

interface UseCaseCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const UseCaseCard = ({ icon, title, description }: UseCaseCardProps) => {
    return (
        <div className="bg-white dark:bg-[#2D2D2D] rounded-lg p-8 shadow-sm">
            <div className="mb-4 flex justify-start">
                {icon}
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-[#E5E5E5] mb-3">
                {title}
            </h3>

            <p className="text-gray-600 dark:text-[#B0B0B0]">
                {description}
            </p>
        </div>
    );
};

export default UseCaseCard;
