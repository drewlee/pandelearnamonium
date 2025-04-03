import Component from '../../_shared/scripts/component.js';
import PubSub from './pubsub.js';
import { calculateTips } from './utils.js';

export default class TotalsModule extends Component {
  /** @type {boolean} */
  #isActive = false;

  constructor() {
    super();

    PubSub.on({
      calculateTip: this.handleCalculateTip,
      reset: this.handleResetEvt,
    });
  }

  /**
   * Returns a registry of DOM elements and event listeners to initialize.
   *
   * @returns {Record<string, string | (e: Event) => void>[]}
   */
  registerDOM() {
    return [
      {
        id: 'splitter-reset-btn',
        el: 'resetBtnEl',
        type: 'click',
        listener: 'handleResetClick',
      },
      {
        id: 'splitter-split-tip',
        el: 'splitTipEl',
      },
      {
        id: 'splitter-split-total',
        el: 'splitTotalEl',
      },
      {
        id: 'splitter-live-region',
        el: 'liveRegionEl',
      },
    ];
  }

  /**
   * Click event listener on the reset button element.
   */
  handleResetClick() {
    PubSub.trigger('clearAllValues');
    this.handleReset();
  }

  /**
   * Listener for the `reset` custom event.
   */
  handleResetEvt() {
    // No-op if the module is inactive.
    if (!this.#isActive) {
      return;
    }

    PubSub.trigger('clearPartialValues');
    this.handleReset();
  }

  /**
   * Listener for the custom `calculateTip` event.
   *
   * @param {number} tipPercent - The tip percentage value as selected by the user.
   * @returns {boolean} Whether a valid tip calculation was executed given the user inputs.
   */
  handleCalculateTip(tipPercent) {
    // Retrieve the user entered input values.
    const result = PubSub.trigger('getInputValues');

    if (result === undefined || !result.length) {
      // No-op if there are no values.
      return false;
    }

    // Transform the results array into an object.
    const values = result.reduce((values, props) => {
      values = { ...values, ...props };
      return values;
    }, {});

    const { bill, people } = values;

    if (bill === null || people === null) {
      // No-op if there's a missing value.
      return false;
    }

    // Carry out the tip calculation.
    const { splitTip, splitTotal } = calculateTips(bill, people, tipPercent);

    // Update the UI.
    this.renderTotals(splitTip, splitTotal);
    this.resetBtnEl.disabled = false;
    this.#isActive = true;

    return true;
  }

  /**
   * Resets the module to its default state.
   */
  handleReset() {
    this.renderTotals();
    this.resetBtnEl.disabled = true;
    this.#isActive = false;
  }

  /**
   * Outputs the split cost values in the UI. Resets the UI to default values
   * if no arguments have been specified.
   *
   * @param {string} splitTip - The dollar tip amount per person.
   * @param {string} splitTotal - The total cost per person.
   */
  renderTotals(splitTip = '0.00', splitTotal = '0.00') {
    this.splitTipEl.textContent = splitTip;
    this.splitTotalEl.textContent = splitTotal;

    this.notifyA11y(splitTip, splitTotal);
  }

  /**
   * Populates a live region to notify a11y users of content changes.
   *
   * @param {string} splitTip - The dollar tip amount per person.
   * @param {string} splitTotal - The total cost per person.
   */
  notifyA11y(splitTip, splitTotal) {
    // No-op if resetting the module to default.
    if (Number(splitTip) === 0 && Number(splitTotal) === 0) {
      return;
    }

    const message = `Tip amount per person: $${splitTip} - Total per person: $${splitTotal}`;
    this.liveRegionEl.textContent = message;

    // Clear the live region after a short duration.
    setTimeout(() => {
      this.liveRegionEl.textContent = '';
    }, 5000);
  }
}
