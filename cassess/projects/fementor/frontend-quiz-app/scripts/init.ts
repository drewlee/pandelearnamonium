import App from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('fqa-app-container');
  container && new App({ container });
});
