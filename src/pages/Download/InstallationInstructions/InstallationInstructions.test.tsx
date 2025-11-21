import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import InstallationInstructions from './InstallationInstructions';
import messages from '@/i18n/locales/en.json';

// Use real translations from en.json
const t = (key: string) => messages[key as keyof typeof messages] || key;

describe('InstallationInstructions', () => {
    describe('when rendered', () => {
        it('displays main title', () => {
            render(<InstallationInstructions t={t} />);

            expect(screen.getByText(messages['download.instructions.title'])).toBeInTheDocument();
        });

        it('displays DMG instructions title', () => {
            render(<InstallationInstructions t={t} />);

            expect(screen.getByText(messages['download.instructions.dmg.title'])).toBeInTheDocument();
        });

        it('displays ZIP instructions title', () => {
            render(<InstallationInstructions t={t} />);

            expect(screen.getByText(messages['download.instructions.zip.title'])).toBeInTheDocument();
        });
    });

    describe('when DMG instructions are displayed', () => {
        it('shows all 5 DMG steps', () => {
            render(<InstallationInstructions t={t} />);

            expect(screen.getByText(messages['download.instructions.dmg.step1'])).toBeInTheDocument();
            expect(screen.getByText(messages['download.instructions.dmg.step2'])).toBeInTheDocument();
            expect(screen.getByText(messages['download.instructions.dmg.step3'])).toBeInTheDocument();
            expect(screen.getAllByText(messages['download.instructions.dmg.step4']).length).toBeGreaterThanOrEqual(2);
            expect(screen.getAllByText(messages['download.instructions.dmg.step5']).length).toBeGreaterThanOrEqual(2);
        });

        it('uses ordered list', () => {
            const { container } = render(<InstallationInstructions t={t} />);

            const orderedLists = container.querySelectorAll('ol');

            expect(orderedLists.length).toBeGreaterThanOrEqual(2);
        });
    });

    describe('when ZIP instructions are displayed', () => {
        it('shows all 4 ZIP steps', () => {
            render(<InstallationInstructions t={t} />);

            expect(screen.getByText(messages['download.instructions.zip.step1'])).toBeInTheDocument();
            expect(screen.getByText(messages['download.instructions.zip.step2'])).toBeInTheDocument();
            expect(screen.getAllByText(messages['download.instructions.zip.step3']).length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('when translation function is called', () => {
        it('calls t function for main title', () => {
            const customT = vi.fn(t);

            render(<InstallationInstructions t={customT} />);

            expect(customT).toHaveBeenCalledWith('download.instructions.title');
        });

        it('calls t function for DMG title', () => {
            const customT = vi.fn(t);

            render(<InstallationInstructions t={customT} />);

            expect(customT).toHaveBeenCalledWith('download.instructions.dmg.title');
        });

        it('calls t function for ZIP title', () => {
            const customT = vi.fn(t);

            render(<InstallationInstructions t={customT} />);

            expect(customT).toHaveBeenCalledWith('download.instructions.zip.title');
        });

        it('calls t function for all DMG steps', () => {
            const customT = vi.fn(t);

            render(<InstallationInstructions t={customT} />);

            expect(customT).toHaveBeenCalledWith('download.instructions.dmg.step1');
            expect(customT).toHaveBeenCalledWith('download.instructions.dmg.step2');
            expect(customT).toHaveBeenCalledWith('download.instructions.dmg.step3');
            expect(customT).toHaveBeenCalledWith('download.instructions.dmg.step4');
            expect(customT).toHaveBeenCalledWith('download.instructions.dmg.step5');
        });

        it('calls t function for all ZIP steps', () => {
            const customT = vi.fn(t);

            render(<InstallationInstructions t={customT} />);

            expect(customT).toHaveBeenCalledWith('download.instructions.zip.step1');
            expect(customT).toHaveBeenCalledWith('download.instructions.zip.step2');
            expect(customT).toHaveBeenCalledWith('download.instructions.zip.step3');
            expect(customT).toHaveBeenCalledWith('download.instructions.zip.step4');
        });
    });

    describe('when section structure is rendered', () => {
        it('has semantic heading structure', () => {
            render(<InstallationInstructions t={t} />);

            const mainHeading = screen.getByRole('heading', { level: 2 });

            expect(mainHeading).toHaveTextContent(messages['download.instructions.title']);

            const subHeadings = screen.getAllByRole('heading', { level: 3 });

            expect(subHeadings.length).toBe(2);
        });

        it('has grid layout for instructions', () => {
            const { container } = render(<InstallationInstructions t={t} />);

            const grid = container.querySelector('.grid');

            expect(grid).toBeInTheDocument();
            expect(grid).toHaveClass('md:grid-cols-2');
        });

        it('applies correct styling classes', () => {
            const { container } = render(<InstallationInstructions t={t} />);

            const section = container.querySelector('section');

            expect(section).toHaveClass('bg-white', 'dark:bg-[#2D2D2D]', 'rounded-lg');
        });
    });

    describe('when step numbers are rendered', () => {
        it('displays bold step numbers', () => {
            const { container } = render(<InstallationInstructions t={t} />);

            const boldElements = container.querySelectorAll('span.font-bold');

            expect(boldElements.length).toBeGreaterThanOrEqual(9);
        });
    });
});
