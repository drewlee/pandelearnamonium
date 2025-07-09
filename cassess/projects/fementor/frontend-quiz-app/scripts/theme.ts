const FRONTEND_QUIZ_APP = globalThis.FRONTEND_QUIZ_APP;

/**
 * Runs the provided callback function if the user prefers dark theme.
 *
 * @param syncCallback - The callback function to run.
 */
export function syncThemeState(syncCallback: () => void): void {
  try {
    if (localStorage.getItem(FRONTEND_QUIZ_APP.THEME_LS_KEY) === 'true') {
      syncCallback();
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Enables dark theme and sets it as the preferred theme in local storage.
 */
export function enableDarkTheme(): void {
  document.documentElement.classList.remove(FRONTEND_QUIZ_APP.THEME_LIGHT_CN);
  document.documentElement.classList.add(FRONTEND_QUIZ_APP.THEME_DARK_CN);

  try {
    localStorage.setItem(FRONTEND_QUIZ_APP.THEME_LS_KEY, 'true');
  } catch (error) {
    console.error(error);
  }
}

/**
 * Enables light theme and removes the associated value from local storage.
 */
export function enableLightTheme(): void {
  document.documentElement.classList.remove(FRONTEND_QUIZ_APP.THEME_DARK_CN);
  document.documentElement.classList.add(FRONTEND_QUIZ_APP.THEME_LIGHT_CN);

  try {
    localStorage.removeItem(FRONTEND_QUIZ_APP.THEME_LS_KEY);
  } catch (error) {
    console.error(error);
  }
}
