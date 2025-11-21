import type { ContactPage, WithContext } from 'schema-dts';

export interface ContactSeoData {
    '@context': string;
    '@type': 'ContactPage';
    name: string;
    description: string;
    url: string;
    mainEntity: {
        '@type': 'Person';
        name: string;
        email: string;
        url: string;
        contactPoint: {
            '@type': 'ContactPoint';
            contactType: string;
            email: string;
        };
    };
}

export const getContactSeoData = (description: string): ContactSeoData & WithContext<ContactPage> => ({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact MoveIt',
    description,
    url: 'https://nicolaebp.github.io/MoveIt-Website/contact',
    mainEntity: {
        '@type': 'Person',
        name: 'Nicolae Balica',
        email: 'nicolae.balica@bpconsulting.pro',
        url: 'https://github.com/NicolaeBP',
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Developer',
            email: 'nicolae.balica@bpconsulting.pro',
        },
    },
});
