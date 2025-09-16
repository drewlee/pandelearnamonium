import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SiteNav from './SiteNav.js';

const rootEl = document.getElementById('nh-nav_root');

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <StrictMode>
      <SiteNav />
    </StrictMode>,
  );
}
