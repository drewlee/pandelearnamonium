import Component from './component.js';

export default class SignupForm extends Component {
  constructor() {
    super();

    this.formContentEl = document.getElementById('newsletter-form-content');
    this.successContentEl = document.getElementById('success-content');
  }

  /**
   * Returns a registry of DOM elements and event listeners to initialize.
   *
   * @returns {Record<string, string | (e: Event) => void>[]}
   */
  registerDOM() {
    return [
      {
        id: 'nlform',
        el: 'formEl',
        type: 'submit',
        listener: 'handleFormSubmit',
      },
      {
        id: 'success-dismiss-btn',
        el: 'dismissBtnEl',
        type: 'click',
        listener: 'handleSuccessDismiss',
      },
    ];
  }

  /**
   * Handles form submission.
   *
   * @param {SubmitEvent} evt - The event object.
   */
  handleFormSubmit(evt) {
    evt.preventDefault();

    this.formContentEl.setAttribute('hidden', '');
    this.successContentEl.removeAttribute('hidden');
    this.successContentEl.focus();
  }

  /**
   * Handles dismissing the success message.
   */
  handleSuccessDismiss() {
    this.successContentEl.setAttribute('hidden', '');
    this.formContentEl.removeAttribute('hidden');
    this.formContentEl.focus();
  }
}
