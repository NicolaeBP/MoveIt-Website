import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useValidateLanguage } from './useValidateLanguage';
import { MemoryRouter, Route, Routes } from 'react-router';

const renderWithRouter = (path: string) => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter initialEntries={[path]}>
            <Routes>
                <Route path="/:lang" element={children} />
            </Routes>
        </MemoryRouter>
    );

    return renderHook(() => useValidateLanguage(), { wrapper });
};

describe('useValidateLanguage', () => {
    describe('when language parameter is valid', () => {
        it('returns null for Romanian', () => {
            const { result } = renderWithRouter('/ro');

            expect(result.current).toBeNull();
        });

        it('returns null for Spanish', () => {
            const { result } = renderWithRouter('/es');

            expect(result.current).toBeNull();
        });

        it('returns null for French', () => {
            const { result } = renderWithRouter('/fr');

            expect(result.current).toBeNull();
        });

        it('returns null for German', () => {
            const { result } = renderWithRouter('/de');

            expect(result.current).toBeNull();
        });

        it('returns null for Italian', () => {
            const { result } = renderWithRouter('/it');

            expect(result.current).toBeNull();
        });

        it('returns null for Brazilian Portuguese', () => {
            const { result } = renderWithRouter('/pt-BR');

            expect(result.current).toBeNull();
        });

        it('returns null for European Portuguese', () => {
            const { result } = renderWithRouter('/pt-PT');

            expect(result.current).toBeNull();
        });

        it('returns null for Russian', () => {
            const { result } = renderWithRouter('/ru');

            expect(result.current).toBeNull();
        });

        it('returns null for Simplified Chinese', () => {
            const { result } = renderWithRouter('/zh-Hans');

            expect(result.current).toBeNull();
        });

        it('returns null for Traditional Chinese', () => {
            const { result } = renderWithRouter('/zh-Hant');

            expect(result.current).toBeNull();
        });

        it('returns null for Japanese', () => {
            const { result } = renderWithRouter('/ja');

            expect(result.current).toBeNull();
        });

        it('returns null for Korean', () => {
            const { result } = renderWithRouter('/ko');

            expect(result.current).toBeNull();
        });
    });

    describe('when language parameter is invalid', () => {
        it('returns NotFound component for unsupported language', () => {
            const { result } = renderWithRouter('/invalid');

            expect(result.current).not.toBeNull();
            expect(result.current?.type).toBeDefined();
        });

        it('returns NotFound component for English (not in allowed list)', () => {
            const { result } = renderWithRouter('/en');

            expect(result.current).not.toBeNull();
        });
    });
});
