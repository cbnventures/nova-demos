/**
 * Index.
 *
 * Named values used by the repository website redirect-page contract tests.
 * The browser-shaped harness keeps runtime behavior testable without a DOM.
 *
 * @since 2026.11.0
 */
export type Index_ExpectedDestination = string;
export type Index_PageSource = string;
export type Index_ScriptOpenTag = string;
export type Index_ScriptStart = number;
export type Index_ScriptEnd = number;
export type Index_InlineScriptSource = string;
export type Index_LocalHostname = string;
export type Index_LocalHostnames = Index_LocalHostname[];
export type Index_I18nReference = string;
export type Index_I18nReferences = Index_I18nReference[];
export type Index_LocalizedString = string;
export type Index_LocalizedStrings = Index_LocalizedString[];

/**
 * Index - Execute Redirect Script.
 *
 * Models the local browser harness used to exercise the inline redirect logic.
 * The aliases keep test setup values explicit under Nova's type conventions.
 *
 * @since 2026.11.0
 */
export type Index_ExecuteRedirectScript_Hostname = string;
export type Index_ExecuteRedirectScript_Callback = () => void;
export type Index_ExecuteRedirectScript_CountdownIntervalCallback = Index_ExecuteRedirectScript_Callback | undefined;
export type Index_ExecuteRedirectScript_TimeoutCallback = Index_ExecuteRedirectScript_Callback | undefined;
export type Index_ExecuteRedirectScript_StayHereCallback = Index_ExecuteRedirectScript_Callback | undefined;
export type Index_ExecuteRedirectScript_ClearInterval = (timerIdentifier: number) => void;
export type Index_ExecuteRedirectScript_ClearTimeout = (timerIdentifier: number) => void;
export type Index_ExecuteRedirectScript_LocationReplace = (destination: string) => void;
export type Index_ExecuteRedirectScript_CountdownClassAdd = (className: string) => void;
export type Index_ExecuteRedirectScript_Countdown_ClassList = {
  add: Index_ExecuteRedirectScript_CountdownClassAdd;
};
export type Index_ExecuteRedirectScript_Countdown_GetAttribute = (
  attributeName: string,
) => string | null;
export type Index_ExecuteRedirectScript_Countdown = {
  classList: Index_ExecuteRedirectScript_Countdown_ClassList;
  getAttribute: Index_ExecuteRedirectScript_Countdown_GetAttribute;
};
export type Index_ExecuteRedirectScript_CountdownText_TextContent = string;
export type Index_ExecuteRedirectScript_CountdownText = {
  textContent: Index_ExecuteRedirectScript_CountdownText_TextContent;
};
export type Index_ExecuteRedirectScript_CountdownSeconds_TextContent = string;
export type Index_ExecuteRedirectScript_CountdownSeconds = {
  textContent: Index_ExecuteRedirectScript_CountdownSeconds_TextContent;
};
export type Index_ExecuteRedirectScript_StayHereButton_AddEventListener = (
  eventName: string,
  callback: Index_ExecuteRedirectScript_Callback,
) => void;
export type Index_ExecuteRedirectScript_StayHereButton_Dataset_CancelledMessage = string;
export type Index_ExecuteRedirectScript_StayHereButton_Dataset = {
  cancelledMessage: Index_ExecuteRedirectScript_StayHereButton_Dataset_CancelledMessage;
};
export type Index_ExecuteRedirectScript_StayHereButton = {
  addEventListener: Index_ExecuteRedirectScript_StayHereButton_AddEventListener;
  dataset: Index_ExecuteRedirectScript_StayHereButton_Dataset;
};
export type Index_ExecuteRedirectScript_QuerySelector_Returns =
  | Index_ExecuteRedirectScript_Countdown
  | Index_ExecuteRedirectScript_CountdownSeconds
  | Index_ExecuteRedirectScript_CountdownText
  | Index_ExecuteRedirectScript_StayHereButton
  | null;
export type Index_ExecuteRedirectScript_QuerySelector = (
  selector: string,
) => Index_ExecuteRedirectScript_QuerySelector_Returns;
export type Index_ExecuteRedirectScript_Document = {
  querySelector: Index_ExecuteRedirectScript_QuerySelector;
};
export type Index_ExecuteRedirectScript_SetInterval = (
  callback: Index_ExecuteRedirectScript_Callback,
  delayMilliseconds: number,
) => number;
export type Index_ExecuteRedirectScript_SetTimeout = Index_ExecuteRedirectScript_SetInterval;
export type Index_ExecuteRedirectScript_Window_Location_Hostname = string;
export type Index_ExecuteRedirectScript_Window_Location = {
  hostname: Index_ExecuteRedirectScript_Window_Location_Hostname;
  replace: Index_ExecuteRedirectScript_LocationReplace;
};
export type Index_ExecuteRedirectScript_Window = {
  clearInterval: Index_ExecuteRedirectScript_ClearInterval;
  clearTimeout: Index_ExecuteRedirectScript_ClearTimeout;
  location: Index_ExecuteRedirectScript_Window_Location;
  setInterval: Index_ExecuteRedirectScript_SetInterval;
  setTimeout: Index_ExecuteRedirectScript_SetTimeout;
};
export type Index_ExecuteRedirectScript_Context_Destination = string;
export type Index_ExecuteRedirectScript_Context = {
  destination: Index_ExecuteRedirectScript_Context_Destination;
  document: Index_ExecuteRedirectScript_Document;
  window: Index_ExecuteRedirectScript_Window;
};
export type Index_ExecuteRedirectScript_Returns = {
  clearInterval: Index_ExecuteRedirectScript_ClearInterval;
  clearTimeout: Index_ExecuteRedirectScript_ClearTimeout;
  countdownClassAdd: Index_ExecuteRedirectScript_CountdownClassAdd;
  countdownIntervalCallback: Index_ExecuteRedirectScript_CountdownIntervalCallback;
  countdownSeconds: Index_ExecuteRedirectScript_CountdownSeconds;
  countdownText: Index_ExecuteRedirectScript_CountdownText;
  locationReplace: Index_ExecuteRedirectScript_LocationReplace;
  setInterval: Index_ExecuteRedirectScript_SetInterval;
  setTimeout: Index_ExecuteRedirectScript_SetTimeout;
  stayHereCallback: Index_ExecuteRedirectScript_StayHereCallback;
  timeoutCallback: Index_ExecuteRedirectScript_TimeoutCallback;
};
