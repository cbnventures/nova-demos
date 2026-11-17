import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';

import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import messages from '../src/i18n/en.json' with { type: 'json' };

import type {
  Index_ExecuteRedirectScript_ClearInterval,
  Index_ExecuteRedirectScript_ClearTimeout,
  Index_ExecuteRedirectScript_Context,
  Index_ExecuteRedirectScript_Countdown,
  Index_ExecuteRedirectScript_CountdownClassAdd,
  Index_ExecuteRedirectScript_CountdownIntervalCallback,
  Index_ExecuteRedirectScript_CountdownSeconds,
  Index_ExecuteRedirectScript_CountdownText,
  Index_ExecuteRedirectScript_Document,
  Index_ExecuteRedirectScript_Hostname,
  Index_ExecuteRedirectScript_LocationReplace,
  Index_ExecuteRedirectScript_Returns,
  Index_ExecuteRedirectScript_SetInterval,
  Index_ExecuteRedirectScript_SetTimeout,
  Index_ExecuteRedirectScript_StayHereButton,
  Index_ExecuteRedirectScript_StayHereCallback,
  Index_ExecuteRedirectScript_TimeoutCallback,
  Index_ExecuteRedirectScript_Window,
  Index_ExpectedDestination,
  Index_I18nReferences,
  Index_InlineScriptSource,
  Index_LocalHostnames,
  Index_LocalizedStrings,
  Index_PageSource,
  Index_ScriptEnd,
  Index_ScriptOpenTag,
  Index_ScriptStart,
} from './types/index.test.d.ts';

const expectedDestination: Index_ExpectedDestination = 'https://nova.cbnventures.io/';
const pageSource: Index_PageSource = readFileSync(resolve('src/pages/index.astro'), 'utf8');
const scriptOpenTag: Index_ScriptOpenTag = '<script is:inline define:vars={{ destination }}>';
const scriptStart: Index_ScriptStart = pageSource.indexOf(scriptOpenTag) + scriptOpenTag.length;
const scriptEnd: Index_ScriptEnd = pageSource.indexOf('</script>', scriptStart);
const inlineScriptSource: Index_InlineScriptSource = pageSource.slice(scriptStart, scriptEnd);

/**
 * Index - Execute Redirect Script.
 *
 * Runs the homepage client script against a small browser-shaped test harness.
 * Tests can inspect scheduled work without adding a DOM emulation dependency.
 *
 * @param {Index_ExecuteRedirectScript_Hostname} hostname - Hostname.
 *
 * @returns {Index_ExecuteRedirectScript_Returns}
 *
 * @since 2026.11.0
 */
function executeRedirectScript(hostname: Index_ExecuteRedirectScript_Hostname): Index_ExecuteRedirectScript_Returns {
  let countdownIntervalCallback: Index_ExecuteRedirectScript_CountdownIntervalCallback = undefined;
  let timeoutCallback: Index_ExecuteRedirectScript_TimeoutCallback = undefined;
  let stayHereCallback: Index_ExecuteRedirectScript_StayHereCallback = undefined;
  const clearInterval: Index_ExecuteRedirectScript_ClearInterval = vi.fn();
  const clearTimeout: Index_ExecuteRedirectScript_ClearTimeout = vi.fn();
  const locationReplace: Index_ExecuteRedirectScript_LocationReplace = vi.fn();
  const countdownClassAdd: Index_ExecuteRedirectScript_CountdownClassAdd = vi.fn();
  const countdown: Index_ExecuteRedirectScript_Countdown = {
    classList: {
      add: countdownClassAdd,
    },
    getAttribute: vi.fn((attributeName) => {
      if (attributeName === 'data-redirect-delay-seconds') {
        return '5';
      }

      return null;
    }),
  };
  const countdownText: Index_ExecuteRedirectScript_CountdownText = {
    textContent: '',
  };
  const countdownSeconds: Index_ExecuteRedirectScript_CountdownSeconds = {
    textContent: '5',
  };
  const stayHereButton: Index_ExecuteRedirectScript_StayHereButton = {
    addEventListener: vi.fn((eventName, callback) => {
      if (eventName === 'click') {
        stayHereCallback = callback;
      }

      return;
    }),
    dataset: {
      cancelledMessage: messages['redirect']['cancelled'],
    },
  };
  const document: Index_ExecuteRedirectScript_Document = {
    querySelector: vi.fn((selector) => {
      switch (selector) {
        case '[data-countdown]': {
          return countdown;
        }

        case '[data-countdown-text]': {
          return countdownText;
        }

        case '[data-countdown-seconds]': {
          return countdownSeconds;
        }

        case '[data-stay-here]': {
          return stayHereButton;
        }

        default: {
          return null;
        }
      }
    }),
  };
  const setInterval: Index_ExecuteRedirectScript_SetInterval = vi.fn((callback) => {
    countdownIntervalCallback = callback;

    return 1;
  });
  const setTimeout: Index_ExecuteRedirectScript_SetTimeout = vi.fn((callback) => {
    timeoutCallback = callback;

    return 2;
  });
  const window: Index_ExecuteRedirectScript_Window = {
    clearInterval,
    clearTimeout,
    location: {
      hostname,
      replace: locationReplace,
    },
    setInterval,
    setTimeout,
  };
  const context: Index_ExecuteRedirectScript_Context = {
    destination: expectedDestination,
    document,
    window,
  };

  runInNewContext(inlineScriptSource, context);

  return {
    clearInterval,
    clearTimeout,
    countdownClassAdd,
    countdownIntervalCallback,
    countdownSeconds,
    countdownText,
    locationReplace,
    setInterval,
    setTimeout,
    stayHereCallback,
    timeoutCallback,
  };
}

/**
 * Index - Redirect Homepage.
 *
 * Protects the timed redirect, local preview exception, metadata, and localized
 * copy that make up the repository website's only route.
 *
 * @since 2026.11.0
 */
describe('Redirect homepage', () => {
  it('waits five seconds before redirecting', () => {
    const result: Index_ExecuteRedirectScript_Returns = executeRedirectScript('nova-demos.cbnventures.io');

    expect(result['locationReplace']).not.toHaveBeenCalled();

    expect(result['setTimeout']).toHaveBeenCalledWith(expect.any(Function), 5000);

    expect(result['timeoutCallback']).not.toBeUndefined();

    if (result['timeoutCallback'] !== undefined) {
      result.timeoutCallback();
    }

    expect(result['locationReplace']).toHaveBeenCalledWith(expectedDestination);

    return;
  });

  it('keeps the countdown unit attached to the number', () => {
    expect(pageSource).toContain('<span data-countdown-seconds>{redirectDelaySeconds}</span>{messages.redirect.secondsAbbreviation}');

    return;
  });

  it('cancels the redirect when visitors stay', () => {
    const result: Index_ExecuteRedirectScript_Returns = executeRedirectScript('nova-demos.cbnventures.io');

    expect(result['stayHereCallback']).not.toBeUndefined();

    if (result['stayHereCallback'] !== undefined) {
      result.stayHereCallback();
    }

    expect(result['clearInterval']).toHaveBeenCalledWith(1);

    expect(result['clearTimeout']).toHaveBeenCalledWith(2);

    expect(result['countdownClassAdd']).toHaveBeenCalledWith('website-countdown-cancelled');

    expect(result['countdownText']['textContent']).toBe(messages['redirect']['cancelled']);

    expect(result['locationReplace']).not.toHaveBeenCalled();

    return;
  });

  it('never schedules redirects for local hosts', () => {
    const localHostnames: Index_LocalHostnames = [
      'localhost',
      '127.0.0.1',
      '[::1]',
      '0.0.0.0',
      'preview.localhost',
    ];

    for (const localHostname of localHostnames) {
      const result: Index_ExecuteRedirectScript_Returns = executeRedirectScript(localHostname);

      expect(result['setInterval']).not.toHaveBeenCalled();

      expect(result['setTimeout']).not.toHaveBeenCalled();

      expect(result['locationReplace']).not.toHaveBeenCalled();

      expect(result['countdownClassAdd']).toHaveBeenCalledWith('website-countdown-paused');
    }

    return;
  });

  it('keeps the page out of search indexes', () => {
    expect(pageSource).toContain('<meta name="robots" content="noindex" />');

    return;
  });

  it('sources every user-facing label from i18n', () => {
    const i18nReferences: Index_I18nReferences = [
      'messages.redirect.takingYouTo',
      'messages.redirect.in',
      'messages.redirect.secondsAbbreviation',
      'messages.redirect.link',
      'messages.redirect.stayHere',
      'messages.redirect.cancelled',
      'messages.footer.project',
    ];
    const localizedStrings: Index_LocalizedStrings = [
      messages['redirect']['takingYouTo'],
      messages['redirect']['in'],
      messages['redirect']['secondsAbbreviation'],
      messages['redirect']['link'],
      messages['redirect']['stayHere'],
      messages['redirect']['cancelled'],
      messages['footer']['project'],
    ];

    for (const i18nReference of i18nReferences) {
      expect(pageSource).toContain(i18nReference);
    }

    for (const localizedString of localizedStrings) {
      expect(localizedString.length).toBeGreaterThan(0);
    }

    return;
  });

  return;
});
