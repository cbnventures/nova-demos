import { defineConfig } from 'vitest/config';

/**
 * Vitest Configuration.
 *
 * @since 2026.10.1
 */
export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/tests/**/*.test.ts'],
    globals: false,
    testTimeout: 30000, // 30 seconds.
    sequence: {
      concurrent: false,
    },
  },
});
