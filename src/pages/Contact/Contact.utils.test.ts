import { describe, it, expect } from 'vitest';
import { getContactSeoData, type ContactSeoData } from './Contact.utils';

describe('Contact.utils', () => {
    describe('getContactSeoData', () => {
        describe('when called with description', () => {
            it('returns structured data with correct schema', () => {
                const description = 'Contact the MoveIt developer';

                const result: ContactSeoData = getContactSeoData(description);

                expect(result['@context']).toBe('https://schema.org');
                expect(result['@type']).toBe('ContactPage');
                expect(result.name).toBe('Contact MoveIt');
                expect(result.description).toBe(description);
            });

            it('includes person data as main entity', () => {
                const result: ContactSeoData = getContactSeoData('Test description');
                const person = result.mainEntity;

                expect(person).toBeDefined();
                expect(person['@type']).toBe('Person');
                expect(person.name).toBe('Nicolae Balica');
                expect(person.email).toBe('nicolae.balica@bpconsulting.pro');
                expect(person.url).toBe('https://github.com/NicolaeBP');
            });

            it('includes contact point data', () => {
                const result: ContactSeoData = getContactSeoData('Test description');
                const contactPoint = result.mainEntity.contactPoint;

                expect(contactPoint).toBeDefined();
                expect(contactPoint['@type']).toBe('ContactPoint');
                expect(contactPoint.contactType).toBe('Developer');
                expect(contactPoint.email).toBe('nicolae.balica@bpconsulting.pro');
            });

            it('includes correct page URL', () => {
                const result: ContactSeoData = getContactSeoData('Test description');

                expect(result.url).toBe('https://www.moveitapp.io/contact');
            });
        });
    });
});
