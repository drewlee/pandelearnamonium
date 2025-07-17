import Component from '../../shared/scripts/component.js';

export default class SharePopup extends Component {
  /** Component state */
  isOpen = false;

  /**
   * Returns a registry of DOM elements and event listeners to initialize.
   *
   * @returns {import('../../shared/scripts/component.js').ComponentTypeEventRegistry[]}
   */
  registerDOM() {
    return [
      {
        id: 'share-btn',
        el: 'trigger',
        type: 'click',
        listener: 'handleTrigger',
      },
      {
        id: 'close-btn',
        el: 'closeBtn',
        type: 'click',
        listener: 'handleClose',
      },
      {
        id: 'apcomp-share-popup',
        el: 'sharePopup',
        type: 'click',
        listener: (evt) => evt.stopPropagation(),
      },
      {
        id: 'apcomp-share-popup',
        el: 'sharePopup',
        type: 'keyup',
        listener: 'handleEscapeKey',
      },
    ];
  }

  /**
   * Handles the click event on the popup trigger button.
   *
   * @param {MouseEvent} evt - The event object.
   */
  handleTrigger(evt) {
    evt.stopPropagation();
    this.isOpen ? this.handleClose() : this.open();
  }

  /**
   * Handles the keyup event on the popup.
   *
   * @param {KeyboardEvent} evt - The event object.
   */
  handleEscapeKey(evt) {
    // Closes the popup when the escape key is triggered.
    if (evt.key === 'Escape') {
      this.handleClose();
    }
  }

  /**
   * Handles closing the popup.
   */
  handleClose() {
    this.isOpen = false;

    // Remove the event listener for document click.
    document.removeEventListener('click', this.handleClose);

    this.el.sharePopup.classList.remove('active');
    this.el.trigger.setAttribute('aria-expanded', 'false');

    // Place the user's focus back on the trigger button.
    this.el.trigger.focus();
  }

  /**
   * Handles opening the popup.
   */
  open() {
    this.isOpen = true;

    // Close the popup when anything but the popup is clicked.
    document.addEventListener('click', this.handleClose);

    this.el.sharePopup.classList.add('active');
    this.el.trigger.setAttribute('aria-expanded', 'true');

    // Place the user's focus on the first focusable element in the popup.
    const btnEl = this.el.sharePopup.querySelector('button');
    btnEl && btnEl.focus();
  }
}
