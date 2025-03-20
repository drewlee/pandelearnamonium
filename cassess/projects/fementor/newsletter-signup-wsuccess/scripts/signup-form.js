import Component from './component.js';

export default class SignupForm extends Component {
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
    console.log('triggered submit');
  }

  /**
   * Handles dismissing the success message.
   */
  handleSuccessDismiss() {
    console.log('dismiss');
  }
}
