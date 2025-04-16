import Component, { type ComponentType } from '../../shared/scripts/component.js';
import ToggleSwitch from './toggle-switch.js';
import { enableDarkTheme, enableLightTheme, syncThemeState } from './theme-utils.js';
import appData, { type AppDataType } from './app-data.js';
import QuizChooser from './quiz-chooser.js';

export default class App extends Component {
  declare themeSwitch: ToggleSwitch;
  declare quizChooser: QuizChooser;
  declare data: AppDataType.Data;

  constructor() {
    super();

    syncThemeState(() => {
      this.themeSwitch.setActive();
    });
    this.loadData();
  }

  registerDOM(): ComponentType.EventRegistry[] {
    this.themeSwitch = new ToggleSwitch({ onToggle: this.handleThemeToggle });

    return [
      {
        id: 'fqa-header-title',
        el: 'pageTitle',
      },
    ];
  }

  handleThemeToggle(): void {
    this.themeSwitch.isActive ? enableDarkTheme() : enableLightTheme();
  }

  handleChosenQuiz(quizIDStr: string): void {
    this.quizChooser.destroy();
    const quizID = Number(quizIDStr);

    console.log(this.data.quizzes[quizID]);

    this.el.pageTitle.innerText = this.data.quizzes[quizID].title;

    setTimeout(() => {
      this.quizChooser.rerender();
    }, 3000);
  }

  async loadData(): Promise<void> {
    const container = document.getElementById('main');

    if (!container) {
      return;
    }

    this.data = await appData.getAppData();
    // TODO: load error if data fetch fails

    this.quizChooser = new QuizChooser({
      container,
      data: this.data.quizzes,
      onChosenParam: this.handleChosenQuiz,
    });
  }
}
