import Component, { type ComponentTypeEventRegistry } from '../../shared/scripts/component.js';

interface ToggleSwitchParams {
  onToggleParam: (isActive: boolean) => void;
}

export default class ToggleSwitch extends Component {
  #isActive = false;

  get isActive(): boolean {
    return this.#isActive;
  }

  onToggleCallback: ToggleSwitchParams['onToggleParam'];

  /**
   * @param params - The parameters passed into the class instantiation.
   */
  constructor({ onToggleParam }: ToggleSwitchParams) {
    super();
    this.onToggleCallback = onToggleParam;
  }

  /**
   * Returns a registry of DOM elements and event listeners to initialize.
   *
   * @override
   * @returns The registry array.
   */
  registerDOM(): ComponentTypeEventRegistry[] {
    return [
      {
        id: 'fqa-theme-switch-btn',
        el: 'main',
        type: 'click',
        listener: 'handleToggleSwitchClick',
      },
    ];
  }

  /**
   * The click event listener function.
   */
  handleToggleSwitchClick() {
    if (this.isActive) {
      this.setInactive();
    } else {
      this.setActive();
    }

    this.onToggleCallback(this.isActive);
  }

  /**
   * Sets the active state of the toggle switch component.
   */
  setActive() {
    this.#isActive = true;
    this.el.main.classList.add('active');
    this.el.main.setAttribute('aria-checked', 'true');
  }

  /**
   * Sets the inactive state of the toggle switch component.
   */
  setInactive() {
    this.#isActive = false;
    this.el.main.classList.remove('active');
    this.el.main.setAttribute('aria-checked', 'false');
  }
}
