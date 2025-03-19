export default class App {
  /** Component state */
  isOpen = false;

  /** Registry of event handlers to initialize */
  events = [
    {
      el: 'triggerEl',
      type: 'click',
      handler: 'handleTrigger',
    },
    {
      el: 'closeBtnEl',
      type: 'click',
      handler: 'handleClose',
    },
    {
      el: 'sharePopupEl',
      type: 'click',
      handler: (evt) => evt.stopPropagation(),
    },
    {
      el: 'sharePopupEl',
      type: 'keyup',
      handler: 'handleEscapeKey',
    },
  ];

  constructor() {
    this.triggerEl = document.getElementById('share-btn');
    this.sharePopupEl = document.getElementById('apcomp-share-popup');
    this.closeBtnEl = document.getElementById('close-btn');

    this.bindEventHandlers();
    this.initEvents();
  }

  /**
   * Fixes the context reference for event handler functions.
   */
  bindEventHandlers() {
    Object.getOwnPropertyNames(App.prototype).forEach((handler) => {
      if (typeof this[handler] === 'function' && handler.startsWith('handle')) {
        this[handler] = this[handler].bind(this);
      }
    });
  }

  /**
   * Initializes the event handlers from the registry.
   */
  initEvents() {
    this.events.forEach(({ el, type, handler }) => {
      let callback;

      if (typeof handler === 'string') {
        callback = this[handler];
      } else if (typeof handler === 'function') {
        callback = handler;
      } else {
        throw new TypeError('Invalid handler type');
      }

      this[el].addEventListener(type, callback);
    });
  }

  /**
   * Handles click events on the popup trigger button.
   *
   * @param {MouseEvent} evt - The event object.
   */
  handleTrigger(evt) {
    evt.stopPropagation();
    this.isOpen ? this.handleClose() : this.open();
  }

  /**
   * Handles keyup events on the popup element.
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
   * Handles closing the popup element.
   */
  handleClose() {
    this.isOpen = false;

    // Remove the event listener for page click.
    document.removeEventListener('click', this.handleClose);

    this.sharePopupEl.classList.remove('active');
    this.triggerEl.setAttribute('aria-expanded', 'false');

    // Place the user's focus back on the trigger button.
    this.triggerEl.focus();
  }

  /**
   * Handles opening the popup element.
   */
  open() {
    this.isOpen = true;

    // Close the popup when the page is clicked.
    document.addEventListener('click', this.handleClose);

    this.sharePopupEl.classList.add('active');
    this.triggerEl.setAttribute('aria-expanded', 'true');

    // Place the user's focus on the first focusable element in the popup.
    this.sharePopupEl.querySelector('button').focus();
  }
}
