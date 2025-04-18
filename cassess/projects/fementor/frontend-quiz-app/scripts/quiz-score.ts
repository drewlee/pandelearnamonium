import Component, { type ComponentType } from '../../shared/scripts/component.js';
import type { AppDataType } from './app-data.js';

interface QuizScoreParams {
  container: HTMLElement;
  data: AppDataType.Subject;
  onReplayParam: () => void;
  quizID: number;
  score: number;
}

export default class QuizScore extends Component {
  onReplayCallback;

  constructor(params: QuizScoreParams) {
    super(params);

    this.onReplayCallback = params.onReplayParam;
  }

  registerDOM(): ComponentType.EventRegistry[] {
    return [
      {
        id: 'fqa-replay-btn',
        el: 'replayBtn',
        type: 'click',
        listener: 'handleReplayClick',
      },
    ];
  }

  handleReplayClick() {
    this.destroy();
    this.onReplayCallback();
  }

  render({ data, quizID, score }: QuizScoreParams) {
    return `
      <div class="fqa-info">
        <h1 class="fqa-info_score-heading font-style_preset-2 font-style_light">
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
}
