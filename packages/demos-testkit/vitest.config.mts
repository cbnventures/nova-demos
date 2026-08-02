import { defineConfig } from 'vitest/config';

/**
 * Vitest Configuration.
 *
 * @since UNRELEASED
 */
export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.mts'],
    include: ['src/tests/**/*.test.ts'],
    globals: false,
    testTimeout: 30000, // 30 seconds.
    sequence: {
      concurrent: false,
    },
  },
});
