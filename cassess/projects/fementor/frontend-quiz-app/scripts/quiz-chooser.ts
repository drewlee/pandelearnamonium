import Component, { type ComponentType } from '../../shared/scripts/component.js';
import { setFocus } from '../../shared/scripts/a11y-focus-utils.js';
import type { AppDataType } from './app-data.js';

interface QuizChooserParams {
  container: HTMLElement;
  data: AppDataType.Subject[];
  onChosenParam: (quizID: string) => void;
}

export default class QuizChooser extends Component {
  declare isNotFirstRender: boolean;
  html: string | undefined;
  onChosenCallback: QuizChooserParams['onChosenParam'];

  /**
   * @param params - The parameters passed into the class instantiation.
   */
  constructor(params: QuizChooserParams) {
    super(params);
    this.onChosenCallback = params.onChosenParam;
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
        listener: 'handleChosenQuiz',
      },
      {
        id: 'fqa-chooser-heading',
        el: 'heading',
      },
    ];
  }

  /**
   * Listener function for the clicked quiz subject.
   *
   * @param event - The event object.
   */
  handleChosenQuiz(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const buttonEl = target.closest('button');

    if (!buttonEl) {
      return;
    }

    const subject = buttonEl.dataset.quizSubject;

    if (subject) {
      this.destroy();
      this.onChosenCallback(subject);
    }
  }

  /**
   * Composes the HTML structure for the quiz chooser view.
   *
   * @param data - The data to output in the view.
   * @returns The composed HTML.
   */
  composeHTML(data: QuizChooserParams['data']): string {
    const controls = data
      .map(
        (entry, index) => `
          <button
            class="fqa-controls_btn fqa-btn_secondary fqa-btn font-style_preset-4 font-style_medium"
            type="button"
            data-quiz-subject="${index}"
          >
            <span class="fqa-badge_container fqa-badge_color-${index}">
              <img class="fqa-badge_img" src="${entry.icon}" width="40" height="40" alt="" />
            </span>
            ${entry.title}
          </button>`,
      )
      .join('\n');

    const layout = `
      <div class="fqa-info">
        <h1
          class="fqa-info_chooser-heading font-style_preset-2 font-style_light"
          id="fqa-chooser-heading"
        >
          Welcome to the
          <strong class="font-style_medium">Frontend Quiz!</strong>
        </h1>
        <p class="fqa-info_chooser-text text-color_accent font-style_preset-6 font-style_italic">
          Pick a subject to get started.
        </p>
      </div>
      <div class="fqa-controls" id="fqa-controls-container">${controls}</div>`;

    return layout;
  }

  /**
   * Renders the quiz chooser view in the app.
   *
   * @override
   * @param params - The parameter object.
   * @param params.data - The data to output in the view.
   * @returns The HTML to render.
   */
  render({ data }: QuizChooserParams): string {
    // Use the cached content if this view has previously been rendered.
    if (this.html === undefined) {
      this.html = this.composeHTML(data);
    }

    return this.html;
  }

  /**
   * Hook used to set focus on the heading element for a11y.
   */
  afterRender(): void {
    // Avoid programmatic focus placement on initial page load.
    if (this.isNotFirstRender) {
      setFocus(this.el.heading);
    }

    this.isNotFirstRender = true;
  }
}
