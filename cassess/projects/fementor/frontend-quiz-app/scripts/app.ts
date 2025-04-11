import Component from '../../shared/scripts/component.js';
import ToggleSwitch from './toggle-switch.js';
import type { ComponentType } from '../../shared/scripts/component.js';

export default class App extends Component {
  declare themeSwitch: ToggleSwitch;

  constructor() {
    super();
    this.syncThemeSwitchState();
  }

  registerDOM(): ComponentType.EventRegistry[] {
    this.themeSwitch = new ToggleSwitch();
    this.themeSwitch.el.addEventListener('click', this.handleThemeToggleClick);

    return [];
  }

  handleThemeToggleClick() {
    this.themeSwitch.isActive ? this.enableDarkTheme() : this.enableLightTheme();
  }

  syncThemeSwitchState() {
    if (localStorage.getItem('isDarkTheme') === 'true') {
      this.themeSwitch.setActive();
    }
  }

  enableDarkTheme() {
    document.documentElement.classList.remove('style-theme-light');
    document.documentElement.classList.add('style-theme-dark');
    localStorage.setItem('isDarkTheme', 'true');
  }

  enableLightTheme() {
    document.documentElement.classList.add('style-theme-light');
    document.documentElement.classList.remove('style-theme-dark');
    localStorage.setItem('isDarkTheme', 'false');
  }
}
