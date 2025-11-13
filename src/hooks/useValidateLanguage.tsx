import { useParams } from 'react-router';
import NotFound from '../pages/NotFound/NotFound';

const ALLOWED_LANGUAGES = ['ro', 'es', 'fr', 'de', 'it', 'pt-BR', 'pt-PT', 'ru', 'zh-Hans', 'zh-Hant', 'ja', 'ko'] as const;

export const useValidateLanguage = () => {
    const params = useParams();

    const isNotAllowed = params.lang && !ALLOWED_LANGUAGES.includes(params.lang as typeof ALLOWED_LANGUAGES[number]);

    if (isNotAllowed) return <NotFound />;

    return null;
};
