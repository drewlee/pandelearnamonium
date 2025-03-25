import Component from './component.js';

export default class SignupForm extends Component {
  constructor() {
    super();

    this.emailInputEl = document.getElementById('nlform_email-input');
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

    const email = this.emailInputEl.value;

    if (this.isValidEmail(email)) {
      this.formEl.classList.remove('error');
      // this.formContentEl.setAttribute('hidden', '');
      // this.successContentEl.removeAttribute('hidden');
      // this.successContentEl.focus();
    } else {
      this.formEl.classList.add('error');
    }
  }

  /**
   * Handles dismissing the success message.
   */
  handleSuccessDismiss() {
    this.successContentEl.setAttribute('hidden', '');
    this.formContentEl.removeAttribute('hidden');
    this.formContentEl.focus();
  }

  /**
   *
   * @param {string} email -
   * @returns {boolean}
   */
  isValidEmail(email) {
    const emailRegExp = /^.+@.+\..+$/;
    const nEmail = email.trim();

    if (!emailRegExp.test(nEmail)) {
      return false;
    }

    return true;
  }
}
