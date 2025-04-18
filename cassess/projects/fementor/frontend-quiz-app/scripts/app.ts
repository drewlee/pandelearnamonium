import Component, { type ComponentType } from '../../shared/scripts/component.js';
import ToggleSwitch from './toggle-switch.js';
import { enableDarkTheme, enableLightTheme, syncThemeState } from './theme-utils.js';
import appData, { type AppDataType } from './app-data.js';
import QuizChooser from './quiz-chooser.js';
import QuizQuestion from './quiz-question.js';
import QuizScore from './quiz-score.js';

export default class App extends Component {
  declare themeSwitch: ToggleSwitch;
  declare quizChooser: QuizChooser;
  declare quizQuestion: QuizQuestion;
  declare quizScore: QuizScore;
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
        id: 'fqa-header-title-container',
        el: 'pageTitle',
      },
    ];
  }

  handleThemeToggle(): void {
    this.themeSwitch.isActive ? enableDarkTheme() : enableLightTheme();
  }

  handleChosenQuiz(quizIDStr: string): void {
    const quizID = Number(quizIDStr);

    this.quizChooser.destroy();
    this.setQuizTitle(quizID);

    this.quizQuestion = new QuizQuestion({
      container: this.container as HTMLElement,
      currQuestionIdx: 0,
      data: this.data.quizzes[quizID].questions,
      onViewScoreParam: this.handleShowScore,
      quizID,
    });
  }

  handleShowScore(score: number, quizID: number): void {
    const baseParams = {
      data: this.data.quizzes[quizID],
      quizID,
      score,
    };

    if (this.quizScore !== undefined) {
      this.quizScore.rerender(baseParams);
      return;
    }

    this.quizScore = new QuizScore({
      ...baseParams,
      container: this.container as HTMLElement,
      onReplayParam: this.handleReplay,
    });
  }

  handleReplay(): void {
    this.quizChooser.rerender({
      data: this.data.quizzes,
      onChosenParam: this.handleChosenQuiz,
    });
  }

  async loadData(): Promise<void> {
    const container = document.getElementById('main') as HTMLElement;

    this.container = container;
    this.data = await appData.getAppData();
    // TODO: load error if data fetch fails

    this.quizChooser = new QuizChooser({
      container,
      data: this.data.quizzes,
      onChosenParam: this.handleChosenQuiz,
    });
    this.quizChooser.destroy();
    // For dev purposes
    this.handleShowScore(8, 3);
  }

  setQuizTitle(quizID?: number): void {
    let source = '';

    if (quizID !== undefined) {
      const { icon, title } = this.data.quizzes[quizID];
      source = `
        <span class="fqa-badge_container fqa-badge_color-${quizID}">
          <img class="fqa-badge_img" src="${icon}" width="40" height="40" alt="" />
        </span>
        <h1 class="fqa-header_title font-style_medium font-style_preset-4">${title}</h1>`;
    }

    this.el.pageTitle.innerHTML = source;
  }
}
