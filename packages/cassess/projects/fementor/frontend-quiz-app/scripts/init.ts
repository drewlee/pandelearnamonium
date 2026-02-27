import App from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('fqa-app-container');

  if (container) {
    new App({ container });
  }
});
