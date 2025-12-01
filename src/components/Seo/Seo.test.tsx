import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LanguageProvider from '@/context/LanguageContext';
import Seo from './Seo';

const renderWithProviders = (component: React.ReactElement, initialPath = '/') => {
    render(
        <MemoryRouter initialEntries={[initialPath]}>
            <LanguageProvider>
                {component}
            </LanguageProvider>
        </MemoryRouter>
    );

    return document;
};

describe('Seo', () => {
    describe('when rendered with default props', () => {
        it('renders without crashing', () => {
            const doc = renderWithProviders(<Seo title="Test Page" description="Test description" />);

            expect(doc).toBeTruthy();
        });

        it('renders title element', () => {
            const doc = renderWithProviders(<Seo title="Test Page" description="Test description" />);

            const titleElement = doc.querySelector('title');

            expect(titleElement).toBeTruthy();
            expect(titleElement?.textContent).toContain('Test Page');
            expect(titleElement?.textContent).toContain('MoveIt');
        });

        it('renders meta description', () => {
            const doc = renderWithProviders(<Seo title="Test Page" description="Test description" />);

            const metaDescription = doc.querySelector('meta[name="description"]');

            expect(metaDescription).toBeTruthy();
            expect(metaDescription?.getAttribute('content')).toBe('Test description');
        });

        it('uses default ogType of website', () => {
            const doc = renderWithProviders(<Seo title="Test Page" description="Test description" />);

            const ogType = doc.querySelector('meta[property="og:type"]');

            expect(ogType?.getAttribute('content')).toBe('website');
        });

        it('uses default path of /', () => {
            const doc = renderWithProviders(<Seo title="Test Page" description="Test description" />);

            const canonical = doc.querySelector('link[rel="canonical"]');

            expect(canonical?.getAttribute('href')).toContain('/');
        });
    });

    describe('when rendered with custom props', () => {
        it('uses custom ogType', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" ogType="article" />);

            const ogType = doc.querySelector('meta[property="og:type"]');

            expect(ogType?.getAttribute('content')).toBe('article');
        });

        it('uses custom path', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" path="/download" />);

            const canonical = doc.querySelector('link[rel="canonical"]');

            expect(canonical?.getAttribute('href')).toContain('/download');
        });
    });

    describe('Open Graph meta tags', () => {
        it('renders og:title', () => {
            const doc = renderWithProviders(<Seo title="Test Page" description="Test" />);

            const ogTitle = doc.querySelector('meta[property="og:title"]');

            expect(ogTitle?.getAttribute('content')).toContain('Test Page');
        });

        it('renders og:description', () => {
            const doc = renderWithProviders(<Seo title="Test" description="OG Description" />);

            const ogDescription = doc.querySelector('meta[property="og:description"]');

            expect(ogDescription?.getAttribute('content')).toBe('OG Description');
        });

        it('renders og:url', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" path="/contact" />);

            const ogUrl = doc.querySelector('meta[property="og:url"]');

            expect(ogUrl?.getAttribute('content')).toContain('/contact');
        });

        it('renders og:locale', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />, '/ro');

            const ogLocale = doc.querySelector('meta[property="og:locale"]');

            expect(ogLocale).toBeTruthy();
        });

        it('renders og:site_name', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />);

            const ogSiteName = doc.querySelector('meta[property="og:site_name"]');

            expect(ogSiteName?.getAttribute('content')).toBe('MoveIt');
        });

        it('renders og:image', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />);

            const ogImage = doc.querySelector('meta[property="og:image"]');

            expect(ogImage?.getAttribute('content')).toContain('/og-image.png');
        });

        it('renders og:image:width', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />);

            const ogImageWidth = doc.querySelector('meta[property="og:image:width"]');

            expect(ogImageWidth?.getAttribute('content')).toBe('1200');
        });

        it('renders og:image:height', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />);

            const ogImageHeight = doc.querySelector('meta[property="og:image:height"]');

            expect(ogImageHeight?.getAttribute('content')).toBe('630');
        });

        it('renders og:image:alt', () => {
            const doc = renderWithProviders(<Seo title="Test Image" description="Test" />);

            const ogImageAlt = doc.querySelector('meta[property="og:image:alt"]');

            expect(ogImageAlt?.getAttribute('content')).toBe('Test Image');
        });
    });

    describe('Twitter Card meta tags', () => {
        it('renders twitter:card', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />);

            const twitterCard = doc.querySelector('meta[name="twitter:card"]');

            expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
        });

        it('renders twitter:title', () => {
            const doc = renderWithProviders(<Seo title="Twitter Test" description="Test" />);

            const twitterTitle = doc.querySelector('meta[name="twitter:title"]');

            expect(twitterTitle?.getAttribute('content')).toContain('Twitter Test');
        });

        it('renders twitter:description', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Twitter Description" />);

            const twitterDescription = doc.querySelector('meta[name="twitter:description"]');

            expect(twitterDescription?.getAttribute('content')).toBe('Twitter Description');
        });

        it('renders twitter:image', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />);

            const twitterImage = doc.querySelector('meta[name="twitter:image"]');

            expect(twitterImage?.getAttribute('content')).toContain('/og-image.png');
        });

        it('renders twitter:image:alt', () => {
            const doc = renderWithProviders(<Seo title="Twitter Alt" description="Test" />);

            const twitterImageAlt = doc.querySelector('meta[name="twitter:image:alt"]');

            expect(twitterImageAlt?.getAttribute('content')).toBe('Twitter Alt');
        });
    });

    describe('additional SEO meta tags', () => {
        it('renders robots meta tag', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />);

            const robots = doc.querySelector('meta[name="robots"]');

            expect(robots?.getAttribute('content')).toBe('index, follow');
        });

        it('renders author meta tag', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />);

            const author = doc.querySelector('meta[name="author"]');

            expect(author).toBeTruthy();
        });

        it('renders canonical link', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />);

            const canonical = doc.querySelector('link[rel="canonical"]');

            expect(canonical).toBeTruthy();
        });
    });

    describe('hreflang tags', () => {
        it('creates hreflang tags for all supported languages', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />);

            const hreflangLinks = doc.querySelectorAll('link[rel="alternate"][hreflang]');

            expect(hreflangLinks.length).toBeGreaterThanOrEqual(13);
        });

        it('creates x-default hreflang tag', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />);

            const xDefault = doc.querySelector('link[rel="alternate"][hreflang="x-default"]');

            expect(xDefault).toBeTruthy();
            expect(xDefault?.getAttribute('href')).toContain('www.moveitapp.io');
        });

        it('creates hreflang for English', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />);

            const enLink = doc.querySelector('link[rel="alternate"][hreflang="en"]');

            expect(enLink).toBeTruthy();
        });

        it('creates hreflang for Romanian', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />);

            const roLink = doc.querySelector('link[rel="alternate"][hreflang="ro"]');

            expect(roLink).toBeTruthy();
            expect(roLink?.getAttribute('href')).toContain('/ro');
        });

        it('creates hreflang for pt-BR', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />);

            const ptBRLink = doc.querySelector('link[rel="alternate"][hreflang="pt-BR"]');

            expect(ptBRLink).toBeTruthy();
            expect(ptBRLink?.getAttribute('href')).toContain('/pt-BR');
        });
    });

    describe('language-specific behavior', () => {
        it('omits language prefix for English canonical URL', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />, '/');

            const canonical = doc.querySelector('link[rel="canonical"]');
            const href = canonical?.getAttribute('href');

            expect(href).not.toContain('/en');
        });

        it('includes language prefix for non-English canonical URL', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />, '/ro');

            const canonical = doc.querySelector('link[rel="canonical"]');
            const href = canonical?.getAttribute('href');

            expect(href).toContain('/ro');
        });

        it('converts language code to locale format for og:locale', () => {
            const doc = renderWithProviders(<Seo title="Test" description="Test" />, '/pt-BR');

            const ogLocale = doc.querySelector('meta[property="og:locale"]');

            expect(ogLocale?.getAttribute('content')).toBe('pt_BR');
        });
    });
});
