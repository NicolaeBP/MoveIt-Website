import type { RouteConfig } from '@react-router/dev/routes';
import { index, route } from '@react-router/dev/routes';

export default [
    // English routes (explicit)
    index('../src/pages/Home/Home.tsx'),
    route('download', '../src/pages/Download/Download.tsx'),
    route('contact', '../src/pages/Contact/Contact.tsx'),

    route('404', '../src/pages/NotFound/NotFound.tsx', { id: '404' }),

    // Dynamic language routes (validated in loaders)
    route(':lang', '../src/pages/Home/Home.tsx', { id: 'lang-home' }),
    route(':lang/download', '../src/pages/Download/Download.tsx', { id: 'lang-download' }),
    route(':lang/contact', '../src/pages/Contact/Contact.tsx', { id: 'lang-contact' }),

    route('*', '../src/pages/NotFound/NotFound.tsx', { id: 'not-found' }),
] satisfies RouteConfig;
