import Component, { type ComponentType } from '../../shared/scripts/component.js';

type OnToggleCallback = (isActive: boolean) => void;

export default class ToggleSwitch extends Component {
  #isActive: boolean = false;

  get isActive(): boolean {
    return this.#isActive;
  }

  onToggle: OnToggleCallback;

  constructor({ onToggle }: { onToggle: OnToggleCallback }) {
    super();

    this.onToggle = onToggle;
  }

  registerDOM(): ComponentType.EventRegistry[] {
    return [
      {
        id: 'fqa-theme-switch-btn',
        el: 'main',
        type: 'click',
        listener: 'handleToggleSwitchClick',
      },
    ];
  }

  handleToggleSwitchClick() {
    this.isActive ? this.setInactive() : this.setActive();
    this.onToggle(this.isActive);
  }

  setActive() {
    this.#isActive = true;
    this.el.main.classList.add('active');
    this.el.main.setAttribute('aria-checked', 'true');
  }

  setInactive() {
    this.#isActive = false;
    this.el.main.classList.remove('active');
    this.el.main.setAttribute('aria-checked', 'false');
  }
}
