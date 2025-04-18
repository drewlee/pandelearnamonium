import Component, { type ComponentType } from '../../shared/scripts/component.js';
import type { AppDataType } from './app-data.js';
import { sanitize } from './utils.js';

interface QuizSubjectParams {
  container: HTMLElement;
  currQuestionIdx: number;
  data: AppDataType.Question[];
  onViewScoreParam: (score: number, questionIdx: number) => void;
  quizID: number;
}

export default class QuizQuestion extends Component {
  #score = 0;
  #selectedOptionEl: HTMLButtonElement | undefined;
  #selectedOptionIdx: number | undefined;

  currQuestionIdx;
  data;
  onViewScoreCallback;
  quizID;

  constructor(params: QuizSubjectParams) {
    super(params);

    this.currQuestionIdx = params.currQuestionIdx;
    this.data = params.data;
    this.onViewScoreCallback = params.onViewScoreParam;
    this.quizID = params.quizID;
  }

  registerDOM(): ComponentType.EventRegistry[] {
    return [
      {
        id: 'fqa-controls-container',
        el: 'controls',
        type: 'click',
        listener: 'handleChosenOption',
      },
      {
        id: 'fqa-button-submit',
        el: 'submit',
        type: 'click',
        listener: 'handleAnswerSubmit',
      },
      {
        id: 'fqa-button-next',
        el: 'next',
        type: 'click',
        listener: 'handleNextQuestion',
      },
      {
        id: 'fqa-button-score',
        el: 'score',
        type: 'click',
        listener: 'handleViewScore',
      },
      {
        id: 'fqa-submit-error',
        el: 'error',
      },
    ];
  }

  render({ currQuestionIdx, data }: QuizSubjectParams): string {
    const controls = data[currQuestionIdx].options
      .map(
        (entry, index) => `
        <button
          class="fqa-controls_btn fqa-btn_secondary fqa-btn font-style_preset-4 font-style_medium"
          type="button"
          data-quiz-option="${index}"
        >
          <span class="fqa-badge_container font-style_medium font-style_preset-4">
            ${String.fromCharCode(65 + index)}
          </span>
          ${sanitize(entry)}
        </button>`,
      )
      .join('\n');

    const layout = `
      <div class="fqa-info">
        <p class="fqa-info_progress text-color_accent font-style_preset-6 font-style_italic">
          Question ${currQuestionIdx + 1} of ${data.length}
        </p>
        <p class="fqa-info_question font-style_medium font-style_preset-3">
          ${sanitize(data[currQuestionIdx].question)}
        </p>
        <div class="fqa-progress-bar">
          <div
            class="fqa-progress-bar_inner"
            style="width: ${Math.round(((currQuestionIdx + 1) / data.length) * 100)}%;"
          ></div>
        </div>
      </div>
      <div class="fqa-controls" id="fqa-controls-container">
        ${controls}
        <button
          class="fqa-controls_submit fqa-btn_primary fqa-btn font-style_preset-4 font-style_medium active"
          id="fqa-button-submit"
        >
          Submit Answer
        </button>
        <button
          class="fqa-controls_submit fqa-btn_primary fqa-btn font-style_preset-4 font-style_medium"
          id="fqa-button-next"
        >
          Next Question
        </button>
        <button
          class="fqa-controls_submit fqa-btn_primary fqa-btn font-style_preset-4 font-style_medium"
          id="fqa-button-score"
        >
          View Score
        </button>
        <p class="fqa-controls_submit-error font-style_preset-4" id="fqa-submit-error">
          <span class="icn-error"></span>
          Please select an answer
        </p>
      </div>`;

    return layout;
  }

  handleChosenOption(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const buttonEl: HTMLButtonElement | null = target.closest('button.fqa-controls_btn');
    const option = buttonEl?.dataset.quizOption;

    if (!option) {
      return;
    }

    if (this.#selectedOptionEl) {
      this.#selectedOptionEl.classList.remove('active');
    }

    buttonEl.classList.add('active');
    this.el.error.classList.remove('active');
    this.#selectedOptionEl = buttonEl;
    this.#selectedOptionIdx = Number(option);
  }

  handleAnswerSubmit(): void {
    if (this.#selectedOptionIdx === undefined || this.#selectedOptionEl === undefined) {
      this.el.error.classList.add('active');
      return;
    }

    const entry = this.data[this.currQuestionIdx];
    const { answer } = entry;

    this.#selectedOptionEl.classList.remove('active');

    // Handle the correct chosen option.
    if (entry.options[this.#selectedOptionIdx] === entry.answer) {
      this.#selectedOptionEl.classList.add('correct-affirm');
      this.#score++;
    } else {
      // Handle the incorrect chosen option.
      const correctOptionEl = this.getElementForAnswer(answer, entry.options);

      correctOptionEl?.classList.add('correct-option');
      this.#selectedOptionEl.classList.add('incorrect-affirm');
    }

    this.el.controls.classList.add('submitted');
    this.el.submit.classList.remove('active');

    // Show either the "Nex Question" or "View Score" buttons.
    this.currQuestionIdx === this.data.length - 1
      ? this.el.score.classList.add('active')
      : this.el.next.classList.add('active');
  }

  handleNextQuestion() {
    this.currQuestionIdx++;
    this.resetAndDestroy();

    this.rerender({
      data: this.data,
      currQuestionIdx: this.currQuestionIdx,
    });
  }

  resetAndDestroy() {
    this.#selectedOptionEl = undefined;
    this.#selectedOptionIdx = undefined;
    this.destroy();
  }

  handleViewScore() {
    this.onViewScoreCallback(this.#score, this.quizID);
    this.#score = 0;
    this.resetAndDestroy();
  }

  getElementForAnswer(answer: string, options: string[]): HTMLButtonElement | null {
    const index = options.indexOf(answer);
    let el: HTMLButtonElement | null = null;

    if (index > -1) {
      el = this.el.controls.querySelector(`.fqa-controls_btn:nth-child(${index + 1})`);
    }

    return el;
  }
}
