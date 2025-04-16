import Component, { type ComponentType } from '../../shared/scripts/component.js';
import ToggleSwitch from './toggle-switch.js';
import { enableDarkTheme, enableLightTheme, syncThemeState } from './theme-utils.js';
import appData from './app-data.js';
import QuizChooser from './quiz-chooser.js';

export default class App extends Component {
  declare themeSwitch: ToggleSwitch;

  constructor() {
    super();

    syncThemeState(() => {
      this.themeSwitch.setActive();
    });
    this.loadData();
  }

  registerDOM(): ComponentType.EventRegistry[] {
    this.themeSwitch = new ToggleSwitch({ onToggle: this.handleThemeToggle });

    return [];
  }

  handleThemeToggle(): void {
    this.themeSwitch.isActive ? enableDarkTheme() : enableLightTheme();
  }

  async loadData(): Promise<void> {
    const container = document.getElementById('main');

    if (!container) {
      return;
    }

    const data = await appData.getAppData();
    // TODO: load error if data fetch fails

    new QuizChooser({ container, data });
  }
}
