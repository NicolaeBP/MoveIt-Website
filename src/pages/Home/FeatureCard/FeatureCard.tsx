import ThemedImage from '../../../components/ThemedImage/ThemedImage';

interface FeatureCardProps {
    title: string;
    description: string;
    items: string[];
    lightSrc: string;
    darkSrc: string;
    alt: string;
    reversed?: boolean;
    isLCP?: boolean;
    width?: number;
    height?: number;
}

const FeatureCard = ({
    title,
    description,
    items,
    lightSrc,
    darkSrc,
    alt,
    reversed = false,
    isLCP = false,
    width,
    height
}: FeatureCardProps) => {
    const imageContent = (
        <div className={`${reversed ? 'order-2 lg:order-1' : ''} bg-primary-50 dark:bg-[#2D2D2D] border border-primary-200 dark:border-[#383838] rounded-lg shadow-lg p-2 flex items-center justify-center max-w-lg mx-auto`}>
            <ThemedImage
                lightSrc={lightSrc}
                darkSrc={darkSrc}
                alt={alt}
                width={width}
                height={height}
                {...(isLCP ? { fetchPriority: 'high' } : { loading: 'lazy' })}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto rounded-lg"
            />
        </div>
    );

    const textContent = (
        <div className={`text-center lg:text-left ${reversed ? 'order-1 lg:order-2' : ''}`}>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-[#E5E5E5] mb-4">
                {title}
            </h3>

            <p className="text-lg text-gray-600 dark:text-[#B0B0B0] mb-4 max-w-2xl mx-auto lg:mx-0">
                {description}
            </p>

            <ul className="space-y-2 text-gray-600 dark:text-[#B0B0B0]">
                {items.map((item) => <li key={item}>✓ {item}</li>)}
            </ul>
        </div>
    );

    return (
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {reversed ? (
                <>
                    {imageContent}
                    {textContent}
                </>
            ) : (
                <>
                    {textContent}
                    {imageContent}
                </>
            )}
        </div>
    );
};

export default FeatureCard;
