/**
 * Regex - Root Scripts.
 *
 * Centralized regex patterns for root-level scripts. The no-regex-literals
 * ESLint rule redirects inline literals to this barrel.
 *
 * @since 0.0.0
 */

/**
 * Lib - Regex - Pattern Plain Command Argument.
 *
 * Matches a command argument made only of word characters and the flag, path,
 * and name punctuation that the Windows command shell reads literally.
 *
 * @since 2026.10.6
 */
export const PATTERN_PLAIN_COMMAND_ARGUMENT = /^[\w./:=@-]+$/;
