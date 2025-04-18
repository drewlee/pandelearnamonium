import app from './app.js';
import Dashboard from './dashboard.js';

/**
 * Makes a fetch request to bootstrap the app with data. Initializes the UI
 * once the fetch request is resolved and the DOM is ready.
 */
async function init() {
  const dataPromise = app.getDashboardData();
  let contentLoadedPromise;

  document.addEventListener('DOMContentLoaded', () => {
    contentLoadedPromise = Promise.resolve();
  });

  const results = await Promise.all([dataPromise, contentLoadedPromise]);
  const data = results[0];

  if (data) {
    const dashboard = new Dashboard(data);
    dashboard.renderContentForTimeframe('daily');
  }
}

init();
