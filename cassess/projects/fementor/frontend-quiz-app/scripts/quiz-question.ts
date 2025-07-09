import Component, { type ComponentType } from '../../shared/scripts/component.js';
import { setFocus } from '../../shared/scripts/a11y-focus-utils.js';
import type * as AppDataType from './app-data-types.js';
import { sanitize } from './utils.js';

interface QuizSubjectParams {
  container: HTMLElement;
  currQuestionIdx: number;
  data: AppDataType.Question[];
  onViewScoreParam: (score: number, questionIdx: number) => void;
  quizID: number;
}

const A11Y_CORRECT_OUTPUT = '<span class="visually-hidden">Correct answer</span>';
const A11Y_INCORRECT_OUTPUT = '<span class="visually-hidden">Incorrect answer</span>';

export default class QuizQuestion extends Component {
  #score = 0;
  #selectedOptionEl: HTMLButtonElement | undefined;
  #selectedOptionIdx: number | undefined;

  declare quizID: number;
  currQuestionIdx;
  data;
  onViewScoreCallback;

  /**
   * @param params - The parameters passed into the class instantiation.
   */
  constructor(params: QuizSubjectParams) {
    super(params);

    this.currQuestionIdx = params.currQuestionIdx;
    this.data = params.data;
    this.onViewScoreCallback = params.onViewScoreParam;
  }

  /**
   * Returns a registry of DOM elements and event listeners to initialize.
   *
   * @override
   * @returns The registry array.
   */
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
      {
        id: 'fqa-question',
        el: 'question',
      },
      {
        id: 'a11y-live-region',
        el: 'liveRegion',
      },
    ];
  }

  /**
   * Event listener function for the clicked answer button.
   *
   * @param event - The event object.
   */
  handleChosenOption(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const buttonEl: HTMLButtonElement | null = target.closest('button.fqa-controls_btn');
    const option = buttonEl?.dataset.quizOption;

    if (!option) {
      return;
    }

    // Deactivate the previously selected answer.
    if (this.#selectedOptionEl) {
      this.#selectedOptionEl.classList.remove('active');
      this.#selectedOptionEl.setAttribute('aria-pressed', 'false');
    }

    // Activate the selected answer.
    buttonEl.classList.add('active');
    buttonEl.setAttribute('aria-pressed', 'true');

    // Remove any active errors.
    this.el.error.classList.remove('active');

    // Store the selected element and index.
    this.#selectedOptionEl = buttonEl;
    this.#selectedOptionIdx = Number(option);
  }

  /**
   * Listener function for the "Submit Answer" button click event.
   */
  handleAnswerSubmit(): void {
    // Display an error if no answer has been selected.
    if (this.#selectedOptionIdx === undefined || this.#selectedOptionEl === undefined) {
      this.el.error.classList.add('active');
      this.a11yNotify(this.el.error.innerText);
      return;
    }

    const entry = this.data[this.currQuestionIdx];
    const { answer } = entry;

    // Deactivate the selected answer.
    this.#selectedOptionEl.classList.remove('active');
    this.#selectedOptionEl.setAttribute('aria-pressed', 'false');

    // Correct answer handling.
    if (entry.options[this.#selectedOptionIdx] === answer) {
      // Display the indicator for the correct answer.
      this.#selectedOptionEl.classList.add('correct-affirm');
      this.#selectedOptionEl.innerHTML += A11Y_CORRECT_OUTPUT;
      this.#score++;

      // A11y notification.
      this.a11yNotify(
        `${String.fromCharCode(65 + this.#selectedOptionIdx)}. ${answer} is the correct answer`,
      );
    } else {
      // Incorrect answer handling.
      // Get the element corresponding to the correct answer.
      const correctOptionEl = this.getElementForAnswer(answer, entry.options);

      if (correctOptionEl) {
        // Display the indicator for the correct answer.
        correctOptionEl.classList.add('correct-option');
        correctOptionEl.innerHTML += A11Y_CORRECT_OUTPUT;
      }

      // Display the indicator for the incorrect answer.
      this.#selectedOptionEl.classList.add('incorrect-affirm');
      this.#selectedOptionEl.innerHTML += A11Y_INCORRECT_OUTPUT;

      // A11y notification.
      this.a11yNotify(
        `${String.fromCharCode(65 + this.#selectedOptionIdx)}. ${entry.options[this.#selectedOptionIdx]} is not the correct answer`,
      );
    }

    // Disable all options.
    this.el.controls.querySelectorAll('.fqa-controls_btn').forEach((el) => {
      (el as HTMLButtonElement).disabled = true;
    });

    // Hide the "Submit Answer" button.
    this.el.submit.classList.remove('active');

    // Show either the "Next Question" or the "View Score" buttons depending on
    // whether this is the last question.
    if (this.currQuestionIdx < this.data.length - 1) {
      this.el.next.classList.add('active');
      setFocus(this.el.next);
    } else {
      this.el.score.classList.add('active');
      setFocus(this.el.score);
    }
  }

  /**
   * Event listener for the "Next Question" button click.
   */
  handleNextQuestion() {
    this.currQuestionIdx++;
    this.resetAndDestroy();

    this.rerender({
      data: this.data,
      currQuestionIdx: this.currQuestionIdx,
      quizID: this.quizID,
    });
  }

  /**
   * Event listener for the "View Score" button click.
   */
  handleViewScore() {
    this.resetAndDestroy();
    this.onViewScoreCallback(this.#score, this.quizID);
    this.#score = 0;
  }

  /**
   * Renders the view for the quiz question.
   *
   * @override
   * @param currQuestionIdx - The index of the current question in the data array.
   * @param data - The data for the current quiz subject.
   * @param quizID - The current quiz ID.
   * @returns The HTML to render.
   */
  render({ currQuestionIdx, data, quizID }: QuizSubjectParams): string {
    this.quizID = quizID;

    const controls = data[currQuestionIdx].options
      .map(
        (entry, index) => `
        <button
          class="fqa-controls_btn fqa-btn_secondary fqa-btn font-style_preset-4 font-style_medium"
          type="button"
          data-quiz-option="${index}"
          aria-pressed="false"
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
        <p class="fqa-info_question font-style_medium font-style_preset-3" id="fqa-question">
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
        <div class="visually-hidden" id="a11y-live-region" aria-live="polite"></div>
      </div>`;

    return layout;
  }

  /**
   * Hook used to set focus on the question text for a11y.
   */
  afterRender(): void {
    setFocus(this.el.question);
  }

  /**
   * Resets the component in order to render the next question in the quiz.
   */
  resetAndDestroy() {
    this.#selectedOptionEl = undefined;
    this.#selectedOptionIdx = undefined;
    this.destroy();
  }

  /**
   * Given the correct answer and list of options, derives the button element that corresponds to
   * the correct answer.
   *
   * @param answer - The correct answer.
   * @param options - An array of answers to the question.
   * @returns The button element corresponding to the correct answer.
   */
  getElementForAnswer(answer: string, options: string[]): HTMLButtonElement | null {
    const index = options.indexOf(answer);
    let el: HTMLButtonElement | null = null;

    if (index > -1) {
      el = this.el.controls.querySelector(`.fqa-controls_btn:nth-child(${index + 1})`);
    }

    return el;
  }

  /**
   * Notifies screen reader users whether the selected answer is correct.
   *
   * @param msg - The message to notify.
   */
  a11yNotify(msg: string): void {
    this.el.liveRegion.innerText = msg;

    // Clear out the live region after a short duration.
    setTimeout(() => {
      // Ensure content hasn't been destroyed already.
      if (this.el.liveRegion) {
        this.el.liveRegion.innerText = '';
      }
    }, 3000);
  }
}
