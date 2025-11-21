import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DirectDownloadSection from './DirectDownloadSection';
import type { GitHubRelease } from '@/types/github.ts';
import messages from '@/i18n/locales/en.json';

const t = (key: string) => messages[key as keyof typeof messages] || key;

const mockRelease: GitHubRelease = {
    tag_name: 'v1.0.0',
    name: 'Version 1.0.0',
    published_at: '2025-01-01T00:00:00Z',
    body: '## Changes\n- Feature 1\n- Feature 2',
    assets: [
        {
            name: 'app.dmg',
            size: 10485760,
            download_count: 100,
            browser_download_url: 'https://github.com/downloads/app.dmg',
        },
    ],
};

describe('DirectDownloadSection', () => {
    describe('when loading is true', () => {
        it('displays loading spinner', () => {
            render(<DirectDownloadSection releases={[]} loading={true} error={null} t={t} />);

            expect(screen.getByText(messages['download.directDownload.loading'])).toBeInTheDocument();
        });

        it('has aria-live attribute', () => {
            const { container } = render(<DirectDownloadSection releases={[]} loading={true} error={null} t={t} />);

            const output = container.querySelector('output[aria-live="polite"]');

            expect(output).toBeInTheDocument();
        });
    });

    describe('when error exists', () => {
        it('displays error state', () => {
            render(<DirectDownloadSection releases={[]} loading={false} error="Failed" t={t} />);

            expect(screen.getByText(messages['download.directDownload.error.title'])).toBeInTheDocument();
        });
    });

    describe('when releases array is empty', () => {
        it('displays no releases message', () => {
            render(<DirectDownloadSection releases={[]} loading={false} error={null} t={t} />);

            expect(screen.getByText(messages['download.directDownload.noReleases'])).toBeInTheDocument();
        });
    });

    describe('when releases exist', () => {
        it('displays releases', () => {
            render(<DirectDownloadSection releases={[mockRelease]} loading={false} error={null} t={t} />);

            expect(screen.getByText('Version 1.0.0')).toBeInTheDocument();
        });

        it('displays view all releases link', () => {
            render(<DirectDownloadSection releases={[mockRelease]} loading={false} error={null} t={t} />);

            const link = screen.getByRole('link', { name: /View all releases/i });

            expect(link).toBeInTheDocument();
        });

        it('displays Windows note', () => {
            render(<DirectDownloadSection releases={[mockRelease]} loading={false} error={null} t={t} />);

            expect(screen.getByText(messages['download.directDownload.windowsNote'])).toBeInTheDocument();
        });

        it('limits to 3 releases', () => {
            const releases = [mockRelease, { ...mockRelease, tag_name: 'v2.0.0' }, { ...mockRelease, tag_name: 'v3.0.0' }, { ...mockRelease, tag_name: 'v4.0.0' }];

            render(<DirectDownloadSection releases={releases} loading={false} error={null} t={t} />);

            // Query for the release card headings (h3 elements) which represent each release
            const releaseHeadings = screen.getAllByRole('heading', { level: 3 });
            expect(releaseHeadings.length).toBeLessThanOrEqual(3);
        });
    });
});
