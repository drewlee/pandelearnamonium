import Component from '../../shared/scripts/component.js';
import { setFocus } from './a11y-utils.js';

export default class Dashboard extends Component {
  /** @type {Map<string, string>} */
  #prevLabel = new Map([
    ['daily', 'Yesterday'],
    ['weekly', 'Last Week'],
    ['monthly', 'Last Month'],
  ]);

  /** @type {Map<string, string>} */
  #a11yLabel = new Map([
    ['daily', 'Daily report'],
    ['weekly', 'Weekly report'],
    ['monthly', 'Monthly report'],
  ]);

  /**
   * Class constructor.
   *
   * @param {Record<string, object>} data - The time tracking dashboard data.
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
    /** @type {HTMLElement} */
    this.navEl = null;

    /** @type {HTMLElement} */
    this.dashboardContentEl = null;

    return [
      {
        id: 'dashboard-nav',
        el: 'navEl',
        type: 'click',
        listener: 'handleDashboardNav',
      },
      {
        id: 'dashboard-content',
        el: 'dashboardContentEl',
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
   * @param {string} timeframe - The given time frame (e.g., daily, weekly, monthly).
   * @returns {string} The label in reference to the past.
   */
  getFormattedLabel(timeframe) {
    return this.#prevLabel.get(timeframe);
  }

  /**
   * Composes the HTML content for the given time frame.
   *
   * @param {string} timeframe - The time frame to display content for.
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
   * @param {string} timeframe - The time frame to display content for (e.g., daily, weekly, monthly).
   */
  renderContentForTimeframe(timeframe) {
    if (!this.htmlCache.has(timeframe)) {
      const html = this.getHTML(timeframe);
      this.htmlCache.set(timeframe, html);
    }

    this.dashboardContentEl.innerHTML = this.htmlCache.get(timeframe);
  }

  /**
   * Sets the ARIA label for the corresponding time frame selected in the UI.
   * This is necessary to notify screen reader users of dynamic content changes.
   *
   * @param {string} timeframe - The selected time frame (e.g., daily, weekly, monthly).
   * @param {HTMLElement} el - The HTML element to apply the ARIA label to.
   */
  setA11yLabelForTimeframe(timeframe, el) {
    el.setAttribute('aria-label', this.#a11yLabel.get(timeframe));
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
      const timeframe = target.getAttribute('href').slice(1);

      this.navEl.querySelector('.active').classList.remove('active');
      target.classList.add('active');

      this.renderContentForTimeframe(timeframe);
      this.setA11yLabelForTimeframe(timeframe, this.dashboardContentEl);

      const origScrollTop = document.documentElement.scrollTop;
      setFocus(this.dashboardContentEl);

      // Prevent abrupt focus scrolling on smaller screens
      document.documentElement.scrollTop = origScrollTop;
    }
  }
}
