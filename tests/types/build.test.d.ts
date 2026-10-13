import type { SpawnSyncReturns } from 'node:child_process';

/**
 * Build.
 *
 * Named values used by the locale build-helper contract tests.
 *
 * @since 2026.10.3
 */
export type Build_Result = SpawnSyncReturns<string>;

export type Build_ModuleUrl = string;

export type Build_Evaluation = string;
