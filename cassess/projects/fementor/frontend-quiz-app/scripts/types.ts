interface FrontendQuizAppGlobal {
  THEME_LS_KEY: string;
  THEME_LIGHT_CN: string;
  THEME_DARK_CN: string;
}

declare global {
  // eslint-disable-next-line no-var
  var FRONTEND_QUIZ_APP: FrontendQuizAppGlobal;
}

export {};
