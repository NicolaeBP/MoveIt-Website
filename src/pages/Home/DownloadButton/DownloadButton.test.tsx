import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import DownloadButton from './DownloadButton';
import messages from '@/i18n/locales/en.json';

// Use real translations from en.json
const t = (key: string) => messages[key as keyof typeof messages] || key;

describe('DownloadButton', () => {
    describe('when loading is true', () => {
        it('displays loading button', () => {
            render(
                <DownloadButton
                    isWindows={false}
                    loading={true}
                    downloadUrl={null}
                    t={t}
                />
            );

            const button = screen.getByRole('button', { name: messages['home.hero.loading'] });

            expect(button).toBeInTheDocument();
        });

        it('disables loading button', () => {
            render(
                <DownloadButton
                    isWindows={false}
                    loading={true}
                    downloadUrl={null}
                    t={t}
                />
            );

            const button = screen.getByRole('button', { name: messages['home.hero.loading'] });

            expect(button).toBeDisabled();
        });

        it('applies cursor-wait class', () => {
            render(
                <DownloadButton
                    isWindows={false}
                    loading={true}
                    downloadUrl={null}
                    t={t}
                />
            );

            const button = screen.getByRole('button', { name: messages['home.hero.loading'] });

            expect(button).toHaveClass('cursor-wait');
        });

        it('does not display download link', () => {
            render(
                <DownloadButton
                    isWindows={false}
                    loading={true}
                    downloadUrl="https://example.com/download"
                    t={t}
                />
            );

            expect(screen.queryByRole('link')).not.toBeInTheDocument();
        });
    });

    describe('when loading is false and downloadUrl exists', () => {
        it('displays download link', () => {
            render(
                <DownloadButton
                    isWindows={false}
                    loading={false}
                    downloadUrl="https://example.com/download.dmg"
                    t={t}
                />
            );

            const link = screen.getByRole('link', { name: messages['home.hero.downloadLatest'] });

            expect(link).toBeInTheDocument();
        });

        it('sets correct href attribute', () => {
            render(
                <DownloadButton
                    isWindows={false}
                    loading={false}
                    downloadUrl="https://example.com/download.dmg"
                    t={t}
                />
            );

            const link = screen.getByRole('link', { name: messages['home.hero.downloadLatest'] });

            expect(link).toHaveAttribute('href', 'https://example.com/download.dmg');
        });

        it('applies gradient styling', () => {
            render(
                <DownloadButton
                    isWindows={false}
                    loading={false}
                    downloadUrl="https://example.com/download.dmg"
                    t={t}
                />
            );

            const link = screen.getByRole('link', { name: messages['home.hero.downloadLatest'] });

            expect(link).toHaveClass('bg-gradient-to-br');
        });

        it('renders with inline class when inline is true', () => {
            render(
                <DownloadButton
                    isWindows={false}
                    loading={false}
                    downloadUrl="https://example.com/download.dmg"
                    t={t}
                    inline={true}
                />
            );

            const link = screen.getByRole('link', { name: messages['home.hero.downloadLatest'] });

            expect(link).toHaveClass('inline-block');
        });

        it('does not render inline class when inline is false', () => {
            render(
                <DownloadButton
                    isWindows={false}
                    loading={false}
                    downloadUrl="https://example.com/download.dmg"
                    t={t}
                    inline={false}
                />
            );

            const link = screen.getByRole('link', { name: messages['home.hero.downloadLatest'] });

            expect(link).not.toHaveClass('inline-block');
        });
    });

    describe('when loading is false, downloadUrl is null, and isWindows is true', () => {
        it('displays Windows coming soon button', () => {
            render(
                <DownloadButton
                    isWindows={true}
                    loading={false}
                    downloadUrl={null}
                    t={t}
                />
            );

            const button = screen.getByRole('button', { name: messages['home.hero.windowsComingSoon'] });

            expect(button).toBeInTheDocument();
        });

        it('disables Windows coming soon button', () => {
            render(
                <DownloadButton
                    isWindows={true}
                    loading={false}
                    downloadUrl={null}
                    t={t}
                />
            );

            const button = screen.getByRole('button', { name: messages['home.hero.windowsComingSoon'] });

            expect(button).toBeDisabled();
        });

        it('applies cursor-not-allowed class', () => {
            render(
                <DownloadButton
                    isWindows={true}
                    loading={false}
                    downloadUrl={null}
                    t={t}
                />
            );

            const button = screen.getByRole('button', { name: messages['home.hero.windowsComingSoon'] });

            expect(button).toHaveClass('cursor-not-allowed');
        });

        it('sets title attribute', () => {
            render(
                <DownloadButton
                    isWindows={true}
                    loading={false}
                    downloadUrl={null}
                    t={t}
                />
            );

            const button = screen.getByRole('button', { name: messages['home.hero.windowsComingSoon'] });

            expect(button).toHaveAttribute('title', messages['home.hero.windowsComingSoon']);
        });
    });

    describe('when loading is false, downloadUrl is null, and isWindows is false', () => {
        it('displays View Downloads link', () => {
            render(
                <DownloadButton
                    isWindows={false}
                    loading={false}
                    downloadUrl={null}
                    t={t}
                />
            );

            const link = screen.getByRole('link', { name: messages['home.hero.viewDownloads'] });

            expect(link).toBeInTheDocument();
        });

        it('links to download page', () => {
            render(
                <DownloadButton
                    isWindows={false}
                    loading={false}
                    downloadUrl={null}
                    t={t}
                />
            );

            const link = screen.getByRole('link', { name: messages['home.hero.viewDownloads'] });

            expect(link).toHaveAttribute('href', '/download');
        });

        it('applies gradient styling', () => {
            render(
                <DownloadButton
                    isWindows={false}
                    loading={false}
                    downloadUrl={null}
                    t={t}
                />
            );

            const link = screen.getByRole('link', { name: messages['home.hero.viewDownloads'] });

            expect(link).toHaveClass('bg-gradient-to-br');
        });

        it('renders with inline class when inline is true', () => {
            render(
                <DownloadButton
                    isWindows={false}
                    loading={false}
                    downloadUrl={null}
                    t={t}
                    inline={true}
                />
            );

            const link = screen.getByRole('link', { name: messages['home.hero.viewDownloads'] });

            expect(link).toHaveClass('inline-block');
        });
    });

    describe('when translation function is called', () => {
        let customT: ReturnType<typeof vi.fn>;

        beforeEach(() => {
            customT = vi.fn((key: string) => `Translated: ${key}`);
        });

        it('uses translation for loading state', () => {
            render(
                <DownloadButton
                    isWindows={false}
                    loading={true}
                    downloadUrl={null}
                    t={customT}
                />
            );

            expect(customT).toHaveBeenCalledWith('home.hero.loading');
        });

        it('uses translation for download latest', () => {
            render(
                <DownloadButton
                    isWindows={false}
                    loading={false}
                    downloadUrl="https://example.com/download.dmg"
                    t={customT}
                />
            );

            expect(customT).toHaveBeenCalledWith('home.hero.downloadLatest');
        });

        it('uses translation for view downloads', () => {
            render(
                <DownloadButton
                    isWindows={false}
                    loading={false}
                    downloadUrl={null}
                    t={customT}
                />
            );

            expect(customT).toHaveBeenCalledWith('home.hero.viewDownloads');
        });

        it('uses translation for Windows coming soon', () => {
            render(
                <DownloadButton
                    isWindows={true}
                    loading={false}
                    downloadUrl={null}
                    t={customT}
                />
            );

            expect(customT).toHaveBeenCalledWith('home.hero.windowsComingSoon');
        });
    });

    describe('when props change', () => {
        it('updates from loading to loaded with download URL', () => {
            const { rerender } = render(
                <DownloadButton
                    isWindows={false}
                    loading={true}
                    downloadUrl={null}
                    t={t}
                />
            );

            expect(screen.getByRole('button', { name: messages['home.hero.loading'] })).toBeInTheDocument();

            rerender(
                <DownloadButton
                    isWindows={false}
                    loading={false}
                    downloadUrl="https://example.com/download.dmg"
                    t={t}
                />
            );

            expect(screen.queryByRole('button', { name: messages['home.hero.loading'] })).not.toBeInTheDocument();
            expect(screen.getByRole('link', { name: messages['home.hero.downloadLatest'] })).toBeInTheDocument();
        });

        it('updates download URL dynamically', () => {
            const { rerender } = render(
                <DownloadButton
                    isWindows={false}
                    loading={false}
                    downloadUrl="https://example.com/v1.dmg"
                    t={t}
                />
            );

            const link = screen.getByRole('link', { name: messages['home.hero.downloadLatest'] });

            expect(link).toHaveAttribute('href', 'https://example.com/v1.dmg');

            rerender(
                <DownloadButton
                    isWindows={false}
                    loading={false}
                    downloadUrl="https://example.com/v2.dmg"
                    t={t}
                />
            );

            expect(link).toHaveAttribute('href', 'https://example.com/v2.dmg');
        });
    });
});
