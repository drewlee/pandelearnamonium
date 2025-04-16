const FRONTEND_QUIZ_APP = globalThis.FRONTEND_QUIZ_APP;

export function syncThemeState(callback: () => void): void {
  if (localStorage.getItem(FRONTEND_QUIZ_APP.THEME_LS_KEY) === 'true') {
    callback();
  }
}

export function enableDarkTheme(): void {
  document.documentElement.classList.remove(FRONTEND_QUIZ_APP.THEME_LIGHT_CN);
  document.documentElement.classList.add(FRONTEND_QUIZ_APP.THEME_DARK_CN);
  localStorage.setItem(FRONTEND_QUIZ_APP.THEME_LS_KEY, 'true');
}

export function enableLightTheme(): void {
  document.documentElement.classList.remove(FRONTEND_QUIZ_APP.THEME_DARK_CN);
  document.documentElement.classList.add(FRONTEND_QUIZ_APP.THEME_LIGHT_CN);
  localStorage.setItem(FRONTEND_QUIZ_APP.THEME_LS_KEY, 'false');
}
