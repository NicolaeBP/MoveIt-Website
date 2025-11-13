interface ErrorStateProps {
    title: string;
    message: string;
    linkText: string;
    linkUrl: string;
}

const ErrorState = ({ title, message, linkText, linkUrl }: ErrorStateProps) => {
    const [before, after] = message.split('{link}');

    return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <p className="text-red-800 dark:text-red-400 font-semibold mb-2">
                {title}
            </p>

            <p className="text-red-600 dark:text-red-300">
                {before}

                <a
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    {linkText}
                </a>

                {after}
            </p>
        </div>
    );
};

export default ErrorState;
