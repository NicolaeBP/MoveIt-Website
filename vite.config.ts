import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'

// https://vite.dev/config/
export default defineConfig(() => ({
    plugins: [reactRouter()],
    base: '/',
    esbuild: {
        drop: ['console', 'debugger'],
    },
    build: {
        minify: 'esbuild',
        // Rollup output optimizations
        rollupOptions: {
            output: {
                // Manual chunks for better caching and tree-shaking
                manualChunks(id) {
                    // Only bundle node_modules, not externalized modules
                    if (id.includes('node_modules')) {
                        if (id.includes('lucide-react')) {
                            return 'vendor-lucide';
                        }

                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'vendor-react';
                        }
                    }
                },
            },
        },

        chunkSizeWarningLimit: 1000,
    },

    optimizeDeps: {
        include: ['lucide-react'],
    },
}))
