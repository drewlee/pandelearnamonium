import Component, { type ComponentTypeEventRegistry } from '../../shared/scripts/component.js';
import { setFocus } from '../../shared/scripts/a11y-focus-utils.js';
import type * as AppDataType from './app-data-types.js';

interface QuizScoreParams {
  container: HTMLElement;
  data: AppDataType.Subject;
  onReplayParam: () => void;
  quizID: number;
  score: number;
}

export default class QuizScore extends Component {
  onReplayCallback;

  /**
   * @param params - The parameters passed into the class instantiation.
   */
  constructor(params: QuizScoreParams) {
    super(params);
    this.onReplayCallback = params.onReplayParam;
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
        id: 'fqa-replay-btn',
        el: 'replayBtn',
        type: 'click',
        listener: 'handleReplayClick',
      },
      {
        id: 'fqa-score-heading',
        el: 'heading',
      },
    ];
  }

  /**
   * Event listener for "Replay" button click.
   */
  handleReplayClick() {
    this.destroy();
    this.onReplayCallback();
  }

  /**
   * Renders the resulting score of taking the quiz.
   *
   * @override
   * @param params - The parameter object.
   * @remarks
   * * `params.data` - The data object for the current quiz subject.
   * * `params.quizID` - The ID of the current quiz subject.
   * * `params.score` - The resulting score of taking the quiz.
   * @returns The HTML to render.
   */
  render({ data, quizID, score }: QuizScoreParams): string {
    return `
      <div class="fqa-info">
        <h1
          class="fqa-info_score-heading font-style_preset-2 font-style_light"
          id="fqa-score-heading"
        >
          Quiz completed
          <strong class="font-style_medium">You scored...</strong>
        </h1>
      </div>
      <div class="fqa-controls" id="fqa-controls-container">
        <div class="fqa-score-card">
          <div class="fqa-score-card_title">
            <span class="fqa-badge_container fqa-badge_color-${quizID}">
              <img class="fqa-badge_img" src="${data.icon}" width="40" height="40" alt="" />
            </span>
            <h2 class="fqa-header_title font-style_medium font-style_preset-4">${data.title}</h2>
          </div>
          <p class="fqa-score-card_score font-style_preset-4 font-style_medium">
            <strong class="font-style_preset-1 font-style_medium">${score}</strong>
            <span class="text-color_accent">out of ${data.questions.length}</span>
          </p>
        </div>
        <button
          class="fqa-controls_submit fqa-btn_primary fqa-btn font-style_preset-4 font-style_medium active"
          id="fqa-replay-btn"
          type="button"
        >
          Play Again
        </button>
      </div>`;
  }

  /**
   * Hook used to set focus on the heading element for a11y.
   */
  afterRender(): void {
    setFocus(this.el.heading);
  }
}
