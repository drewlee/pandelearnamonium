import Component, { type ComponentTypeEventRegistry } from '../../shared/scripts/component.js';
import ToggleSwitch from './toggle-switch.js';
import { enableDarkTheme, enableLightTheme, syncThemeState } from './theme.js';
import appData from './app-data.js';
import type * as AppDataType from './app-data-types.js';
import QuizChooser from './quiz-chooser.js';
import QuizQuestion from './quiz-question.js';
import QuizScore from './quiz-score.js';

interface AppParams {
  container: HTMLElement;
}

export default class App extends Component {
  declare container: HTMLElement;
  declare data: AppDataType.Data;
  declare quizChooser: QuizChooser;
  declare quizQuestion: QuizQuestion;
  declare quizScore: QuizScore;
  declare themeToggle: ToggleSwitch;

  /**
   * @param params - The parameters passed into the class instantiation.
   */
  constructor(params: AppParams) {
    super(params);
    void this.initializeApp();
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
        id: 'fqa-header-title-container',
        el: 'pageTitle',
      },
    ];
  }

  /**
   * Callback function which runs when the theme toggle switch is activated.
   *
   * @param isActive - Whether the toggle switch component is active.
   */
  handleThemeToggle(isActive: boolean): void {
    if (isActive) {
      enableDarkTheme();
    } else {
      enableLightTheme();
    }
  }

  /**
   * Callback function which runs when a quiz is selected from the quiz chooser.
   *
   * @param quizIDStr - The selected quiz ID.
   */
  handleChosenQuiz(quizIDStr: string): void {
    const quizID = Number(quizIDStr);
    const baseParams = {
      currQuestionIdx: 0,
      data: this.data.quizzes[quizID].questions,
      quizID,
    };

    // Set the quiz title.
    this.setQuizTitle(quizID);

    // Rerender the component if an instance has already been initialized.
    if (this.quizQuestion !== undefined) {
      this.quizQuestion.rerender(baseParams);
    }

    // Initializes the quiz question component.
    this.quizQuestion = new QuizQuestion({
      ...baseParams,
      container: this.container,
      onViewScoreParam: this.handleShowScore.bind(this),
    });
  }

  /**
   * Callback function which runs when the user completes the quiz.
   *
   * @param score - The user's score after completing the quiz.
   * @param quizID - The quiz ID.
   */
  handleShowScore(score: number, quizID: number): void {
    const baseParams = {
      data: this.data.quizzes[quizID],
      quizID,
      score,
    };

    // Rerender the component if an instance has already been initialized.
    if (this.quizScore !== undefined) {
      this.quizScore.rerender(baseParams);
      return;
    }

    // Initializes the quiz score component.
    this.quizScore = new QuizScore({
      ...baseParams,
      container: this.container,
      onReplayParam: this.handleReplay.bind(this),
    });
  }

  /**
   * Callback function which runs when the user wants to retake a quiz.
   */
  handleReplay(): void {
    // Rerender the quiz chooser.
    this.quizChooser.rerender({
      data: this.data.quizzes,
      onChosenParam: this.handleChosenQuiz.bind(this),
    });

    // Clear out the quiz title.
    this.setQuizTitle();
  }

  /**
   * Sets up the application and retrieves its data.
   */
  async initializeApp(): Promise<void> {
    // Initialize the theme toggle switch and sync it to the user's settings.
    this.themeToggle = new ToggleSwitch({ onToggleParam: this.handleThemeToggle.bind(this) });
    syncThemeState(() => this.themeToggle.setActive());

    // Get the application data.
    const data = await this.loadData();

    // Terminate early if there's no data.
    if (!data) {
      return;
    }

    this.data = data;

    // Initialize the the quiz chooser.
    this.quizChooser = new QuizChooser({
      container: this.container,
      data: this.data.quizzes,
      onChosenParam: this.handleChosenQuiz.bind(this),
    });
  }

  /**
   * Fetches the application JSON data.
   *
   * @returns The application data object.
   */
  async loadData(): Promise<AppDataType.Data | null> {
    const data = await appData.getAppData();

    // Display an error in the UI if the data couldn't be retrieved.
    if (!data) {
      const source = `
        <p class="fqa-main-error font-style_preset-4">
          <span class="icn-error"></span>
          Error: Unable to load the quiz due to a technical issue. Please try again at a later time.
        </p>`;

      this.container.innerHTML = source;
    }

    return data;
  }

  /**
   * Sets the title for the active quiz. If no quiz ID is provided, then the title is set blank.
   *
   * @param quizID - The active quiz ID.
   */
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
