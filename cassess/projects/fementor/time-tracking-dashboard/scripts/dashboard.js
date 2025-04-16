import Component from '../../shared/scripts/component.js';
import { setFocus } from './a11y-utils.js';

/** @import {TimeFrameRecordType} from './app.js' */

const TIMEFRAME_LABEL = Object.freeze({
  daily: { prev: 'Yesterday', a11y: 'Daily report' },
  weekly: { prev: 'Last Week', a11y: 'Weekly report' },
  monthly: { prev: 'Last Month', a11y: 'Monthly report' },
});

export default class Dashboard extends Component {
  /** @type {TimeFrameRecordType} */
  data;

  /** @type {Map<keyof TIMEFRAME_LABEL, string>} */
  htmlCache;

  /**
   * Class constructor.
   *
   * @param {TimeFrameRecordType} data - The time tracking dashboard data.
   */
  constructor(data) {
    super();

    this.data = data;
    this.htmlCache = new Map();
  }

  /**
   * Returns a registry of DOM elements and event listeners to initialize.
   *
   * @returns {import('../../shared/scripts/component.js').ComponentType.EventRegistry[]} The registry array.
   */
  registerDOM() {
    return [
      {
        id: 'dashboard-nav',
        el: 'nav',
        type: 'click',
        listener: 'handleDashboardNav',
      },
      {
        id: 'dashboard-content',
        el: 'dashboardContent',
      },
    ];
  }

  /**
   * Formats the `hr(s)` label in the UI based on the number of hours.
   *
   * @param {number} hours - The number of hours.
   * @returns {string} The singular or plural format of hours.
   */
  getFormattedHours(hours) {
    return hours === 1 ? 'hr' : 'hrs';
  }

  /**
   * Outputs the appropriate label in reference to the past for the given time frame.
   *
   * @param {keyof TIMEFRAME_LABEL} timeframe - The given time frame (e.g., daily, weekly, monthly).
   * @returns {string} The label in reference to the past.
   */
  getFormattedLabel(timeframe) {
    return TIMEFRAME_LABEL[timeframe].prev;
  }

  /**
   * Composes the HTML content for the given time frame.
   *
   * @param {keyof TIMEFRAME_LABEL} timeframe - The time frame to display content for.
   * @returns {string} The HTML content.
   */
  getHTML(timeframe) {
    return this.data[timeframe].reduce((html, props) => {
      const { title, current, previous } = props;

      html += `<article class="ttdash-card">
          <div class="ttdash-card_inner">
            <div class="ttdash-card_label-container">
              <h2 class="ttdash-card_label font-style_body font-style_bold">${title}</h2>
              <button class="ttdash-card_more-btn" type="button" aria-label="See more">
                <span class="icn-ellipsis"></span>
              </button>
            </div>
            <div class="ttdash-card_hours-container">
              <p class="ttdash-card_hours font-style_primary">
                ${current}${this.getFormattedHours(current)}
              </p>
              <p class="ttdash-card_prev-hours font-style_accent">
                ${this.getFormattedLabel(timeframe)} - ${previous}${this.getFormattedHours(previous)}
              </p>
            </div>
          </div>
        </article>`;

      return html;
    }, '');
  }

  /**
   * Renders the HTML content for the specified time frame.
   *
   * @param {keyof TIMEFRAME_LABEL} timeframe - The time frame to display content for (e.g., daily, weekly, monthly).
   */
  renderContentForTimeframe(timeframe) {
    let html = this.htmlCache.get(timeframe);

    if (!html) {
      html = this.getHTML(timeframe);
      this.htmlCache.set(timeframe, html);
    }

    this.el.dashboardContent.innerHTML = html;
  }

  /**
   * Sets the ARIA label for the corresponding time frame selected in the UI.
   * This is necessary to notify screen reader users of dynamic content changes.
   *
   * @param {keyof TIMEFRAME_LABEL} timeframe - The selected time frame (e.g., daily, weekly, monthly).
   * @param {HTMLElement} el - The HTML element to apply the ARIA label to.
   */
  setA11yLabelForTimeframe(timeframe, el) {
    el.setAttribute('aria-label', TIMEFRAME_LABEL[timeframe].a11y);
  }

  /**
   * Event listener for handling time tracking dashboard navigation.
   *
   * @param {MouseEvent} evt - The event object.
   */
  handleDashboardNav(evt) {
    evt.preventDefault();

    const { target } = evt;

    if (
      target instanceof HTMLAnchorElement &&
      target.tagName === 'A' &&
      !target.classList.contains('active')
    ) {
      const href = target.getAttribute('href');

      if (!href) {
        return;
      }

      const timeframe = /** @type {keyof TIMEFRAME_LABEL} */ (href.slice(1));
      const activeEl = this.el.nav.querySelector('.active');

      activeEl && activeEl.classList.remove('active');
      target.classList.add('active');

      this.renderContentForTimeframe(timeframe);
      this.setA11yLabelForTimeframe(timeframe, this.el.dashboardContent);

      const origScrollTop = document.documentElement.scrollTop;
      setFocus(this.el.dashboardContent);

      // Prevent abrupt focus scrolling on smaller screens
      document.documentElement.scrollTop = origScrollTop;
    }
  }
}
