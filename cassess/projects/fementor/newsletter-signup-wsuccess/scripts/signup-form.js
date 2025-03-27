import Component from './component.js';

export default class SignupForm extends Component {
  /** @type {string} */
  _email = '';

  /** @returns {string} */
  get email() {
    return this._email;
  }

  /** @param {string} value */
  set email(value) {
    this._email = value;
    this.emailInputEl.value = '';
    this.successEmailEl.textContent = this._email;
  }

  /**
   * Returns a registry of DOM elements and event listeners to initialize.
   *
   * @returns {Record<string, string | (e: Event) => void>[]}
   */
  registerDOM() {
    return [
      {
        id: 'newsletter-form',
        el: 'formEl',
        type: 'submit',
        listener: 'handleFormSubmit',
      },
      {
        id: 'success-content',
        el: 'successContentEl',
        type: 'click',
        listener: 'handleSuccessDismiss',
      },
      {
        id: 'newsletter-form-email-input',
        el: 'emailInputEl',
      },
      {
        id: 'newsletter-form-content',
        el: 'formContentEl',
      },
      {
        id: 'success-email',
        el: 'successEmailEl',
      },
      {
        id: 'newsletter-form-error',
        el: 'formErrorEl',
      },
    ];
  }

  /**
   * Form submission event listener.
   *
   * @param {SubmitEvent} evt - The event object.
   */
  handleFormSubmit(evt) {
    evt.preventDefault();

    const email = this.emailInputEl.value;

    if (this.isValidEmail(email)) {
      this.formEl.classList.remove('error');
      this.emailInputEl.setAttribute('aria-invalid', false);
      this.emailInputEl.removeAttribute('aria-describedby');

      this.email = email;

      this.showContent(this.successContentEl);
      this.setFocus(this.successContentEl);
    } else {
      this.formEl.classList.add('error');
      this.emailInputEl.setAttribute('aria-invalid', true);
      this.emailInputEl.setAttribute('aria-describedby', 'newsletter-form-error');
      this.setFocus(this.formErrorEl);
    }
  }

  /**
   * Success message dismiss event listener.
   *
   * @param {PointerEvent} evt - The event object.
   */
  handleSuccessDismiss(evt) {
    if (evt.target.id === 'success-dismiss-btn') {
      this.showContent(this.formContentEl);
      this.setFocus(this.formContentEl);
    }
  }

  /**
   * Tabindex attribute cleanup event listener.
   *
   * @param {FocusEvent} currentTarget - The HTML element that triggered the event.
   */
  handleCleanupTabindex({ currentTarget }) {
    currentTarget.removeAttribute('tabindex');
    currentTarget.removeEventListener('focusout', this.handleCleanupTabindex);
  }

  /**
   * Determines whether the provided email address is of valid format.
   *
   * @param {string} email - The user entered email address.
   * @returns {boolean} Whether the email address is of valid format.
   */
  isValidEmail(email) {
    // Validation is by no means meant to be exhaustive and is primarily for the benefit of the
    // user as opposed to a strict syntactic check.
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegExp.test(email);
  }

  /**
   * Adds a tabindex attribute to the provided HTML element.
   *
   * @param {HTMLElement} el - The HTML element.
   */
  setTabindex(el) {
    el.setAttribute('tabindex', -1);
    el.addEventListener('focusout', this.handleCleanupTabindex);
  }

  /**
   * Sets focus to the provided HTML element.
   *
   * @param {HTMLElement} el - The HTML element.
   */
  setFocus(el) {
    this.setTabindex(el);
    el.focus();
  }

  /**
   * Displays the provided HTML element.
   *
   * @param {HTMLElement} el - The HTML element.
   */
  showContent(el) {
    document.querySelectorAll('.active').forEach((el) => el.classList.remove('active'));
    el.classList.add('active');
  }
}
