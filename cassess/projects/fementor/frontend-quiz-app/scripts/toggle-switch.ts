import Component, { type ComponentType } from '../../shared/scripts/component.js';

export default class ToggleSwitch extends Component {
  #isActive: boolean = false;

  declare el: HTMLButtonElement;

  get isActive(): boolean {
    return this.#isActive;
  }

  registerDOM(): ComponentType.EventRegistry[] {
    return [
      {
        id: 'fqa-theme-switch-btn',
        el: 'el',
        type: 'click',
        listener: 'handleToggleSwitchClick',
      },
    ];
  }

  handleToggleSwitchClick() {
    this.isActive ? this.setInactive() : this.setActive();
  }

  setActive() {
    this.#isActive = true;
    this.el.classList.add('active');
    this.el.setAttribute('aria-checked', 'true');
  }

  setInactive() {
    this.#isActive = false;
    this.el.classList.remove('active');
    this.el.setAttribute('aria-checked', 'false');
  }
}
