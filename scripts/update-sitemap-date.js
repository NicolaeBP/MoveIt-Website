import { readFileSync, writeFileSync } from 'fs';

const sitemapPath = 'public/sitemap.xml';
const sitemap = readFileSync(sitemapPath, 'utf-8');
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

// Replace all lastmod dates with today's date
const updated = sitemap.replaceAll(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

writeFileSync(sitemapPath, updated);

console.log(`✅ Sitemap dates updated to ${today}`);
