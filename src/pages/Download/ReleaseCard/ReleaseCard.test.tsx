import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReleaseCard from './ReleaseCard';
import type { GitHubRelease } from '@/types/github.ts';
import messages from '@/i18n/locales/en.json';

const t = (key: string) => messages[key as keyof typeof messages] || key;

const mockRelease: GitHubRelease = {
    tag_name: 'v1.0.0',
    name: 'Version 1.0.0',
    published_at: '2025-01-15T10:00:00Z',
    body: '## Bug Fixes\n- Fixed issue 1\n- Fixed issue 2',
    assets: [
        {
            name: 'app-v1.0.0.dmg',
            size: 10485760,
            download_count: 150,
            browser_download_url: 'https://github.com/downloads/app.dmg',
        },
    ],
};

describe('ReleaseCard', () => {
    describe('when release has name', () => {
        it('displays release name', () => {
            render(<ReleaseCard release={mockRelease} t={t} />);

            expect(screen.getByText('Version 1.0.0')).toBeInTheDocument();
        });
    });

    describe('when release has no name', () => {
        it('displays tag name as fallback', () => {
            const releaseWithoutName = { ...mockRelease, name: null };

            render(<ReleaseCard release={releaseWithoutName} t={t} />);

            expect(screen.getByText('v1.0.0')).toBeInTheDocument();
        });
    });

    describe('when release has assets', () => {
        it('displays downloads label', () => {
            render(<ReleaseCard release={mockRelease} t={t} />);

            expect(screen.getByText(messages['download.directDownload.downloadsLabel'])).toBeInTheDocument();
        });

        it('displays asset name', () => {
            render(<ReleaseCard release={mockRelease} t={t} />);

            expect(screen.getByText('app-v1.0.0.dmg')).toBeInTheDocument();
        });

        it('filters out yml files', () => {
            const releaseWithYml = {
                ...mockRelease,
                assets: [
                    { ...mockRelease.assets[0], name: 'app.dmg' },
                    { ...mockRelease.assets[0], name: 'latest.yml' },
                ],
            };

            render(<ReleaseCard release={releaseWithYml} t={t} />);

            expect(screen.queryByText('latest.yml')).not.toBeInTheDocument();
        });

        it('filters out blockmap files', () => {
            const releaseWithBlockmap = {
                ...mockRelease,
                assets: [
                    { ...mockRelease.assets[0], name: 'app.dmg' },
                    { ...mockRelease.assets[0], name: 'app.dmg.blockmap' },
                ],
            };

            render(<ReleaseCard release={releaseWithBlockmap} t={t} />);

            expect(screen.queryByText('app.dmg.blockmap')).not.toBeInTheDocument();
        });
    });

    describe('when release has no assets', () => {
        it('displays no assets message', () => {
            const releaseWithoutAssets = { ...mockRelease, assets: [] };

            render(<ReleaseCard release={releaseWithoutAssets} t={t} />);

            expect(screen.getByText(messages['download.directDownload.noAssets'])).toBeInTheDocument();
        });
    });

    describe('when release body has sections', () => {
        it('displays section title', () => {
            render(<ReleaseCard release={mockRelease} t={t} />);

            expect(screen.getByText('Bug Fixes')).toBeInTheDocument();
        });

        it('displays section content', () => {
            render(<ReleaseCard release={mockRelease} t={t} />);

            expect(screen.getByText(/Fixed issue/)).toBeInTheDocument();
        });
    });
});
