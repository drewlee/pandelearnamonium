import Component from '../../shared/scripts/component.js';

export default class SignupForm extends Component {
  /** @type {string} */
  #email = '';

  /** @returns {string} */
  get email() {
    return this.#email;
  }

  /** @param {string} value */
  set email(value) {
    this.#email = value;
    this.el.emailInput.value = '';
    this.el.successEmail.textContent = this.#email;
  }

  /**
   * Returns a registry of DOM elements and event listeners to initialize.
   *
   * @returns {import('../../shared/scripts/component.js').ComponentType.EventRegistry[]}
   */
  registerDOM() {
    /**
     * @type {{
     *  [key: string]: HTMLElement,
     *  emailInput: HTMLInputElement,
     * }}
     */
    this.el;

    return [
      {
        id: 'newsletter-form',
        el: 'form',
        type: 'submit',
        listener: 'handleFormSubmit',
      },
      {
        id: 'success-content',
        el: 'successContent',
        type: 'click',
        listener: 'handleSuccessDismiss',
      },
      {
        id: 'newsletter-form-email-input',
        el: 'emailInput',
      },
      {
        id: 'newsletter-form-content',
        el: 'formContent',
      },
      {
        id: 'success-email',
        el: 'successEmail',
      },
      {
        id: 'newsletter-form-error',
        el: 'formError',
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

    const email = this.el.emailInput.value;

    if (this.isValidEmail(email)) {
      this.el.form.classList.remove('error');
      this.el.emailInput.setAttribute('aria-invalid', 'false');
      this.el.emailInput.removeAttribute('aria-describedby');

      this.email = email;

      this.showContent(this.el.successContent);
      this.setFocus(this.el.successContent);
    } else {
      this.el.form.classList.add('error');
      this.el.emailInput.setAttribute('aria-invalid', 'true');
      this.el.emailInput.setAttribute('aria-describedby', 'newsletter-form-error');
      this.setFocus(this.el.formError);
    }
  }

  /**
   * Success message dismiss event listener.
   *
   * @param {PointerEvent} evt - The event object.
   */
  handleSuccessDismiss(evt) {
    const { target } = evt;

    if (target instanceof HTMLButtonElement && target.id === 'success-dismiss-btn') {
      this.showContent(this.el.formContent);
      this.setFocus(this.el.formContent);
    }
  }

  /**
   * Tabindex attribute cleanup event listener.
   *
   * @param {FocusEvent} currentTarget - The HTML element that triggered the event.
   */
  handleCleanupTabindex({ currentTarget }) {
    if (currentTarget instanceof HTMLElement) {
      currentTarget.removeAttribute('tabindex');
      currentTarget.removeEventListener('focusout', this.handleCleanupTabindex);
    }
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
    el.setAttribute('tabindex', '-1');
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
