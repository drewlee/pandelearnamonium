import Component, { type ComponentType } from '../../shared/scripts/component.js';
import type { AppDataType } from './app-data.js';

interface QuizChooserParams {
  container: HTMLElement;
  data: AppDataType.Subject[];
  onChosenParam: (quizID: string) => void;
}

export default class QuizChooser extends Component {
  html: string | undefined;

  onChosenCallback: QuizChooserParams['onChosenParam'];

  constructor(params: QuizChooserParams) {
    super(params);
    this.onChosenCallback = params.onChosenParam;
  }

  registerDOM(): ComponentType.EventRegistry[] {
    return [
      {
        id: 'fqa-controls-container',
        el: 'controls',
        type: 'click',
        listener: 'handleChosenQuiz',
      },
    ];
  }

  getHTML(data: QuizChooserParams['data']): string {
    const buttons = data
      .map(
        (entry, index) => `
          <button class="fqa-controls_btn font-style_preset-4 font-style_medium" type="button" data-quiz-subject="${index}">
            <span class="fqa-controls_btn-img-wrap">
              <img class="fqa-controls_btn-img" src="${entry.icon}" width="40" height="40" alt="" />
            </span>
            ${entry.title}
          </button>`,
      )
      .join('\n');

    const layout = `
      <div class="fqa-info">
        <h1 class="fqa-info_chooser-heading font-style_preset-2 font-style_light">
          Welcome to the<br />
          <strong class="font-style_medium">Frontend Quiz!</strong>
        </h1>
        <p class="fqa-info_chooser-text font-style_preset-6 font-style_italic">Pick a subject to get started.</p>
      </div>
      <div class="fqa-controls" id="fqa-controls-container">${buttons}</div>`;

    return layout;
  }

  render(params: QuizChooserParams): string {
    if (!this.html) {
      this.html = this.getHTML(params.data);
    }

    return this.html;
  }

  handleChosenQuiz(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const buttonEl = target.closest('button');

    if (buttonEl) {
      const subject = buttonEl.dataset.quizSubject;
      subject && this.onChosenCallback(subject);
    }
  }
}
