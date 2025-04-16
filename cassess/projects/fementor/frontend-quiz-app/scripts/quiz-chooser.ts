import Component, { type ComponentType } from '../../shared/scripts/component.js';
import type { AppDataType } from './app-data.js';

export default class QuizChooser extends Component {
  declare container: HTMLElement;

  getHTML(data: AppDataType.Data): string {
    let html = data.quizzes
      .map((entry, index) => {
        return `<button type="button" data-quiz-subject="${index}">${entry.title}</button>`;
      })
      .join('\n');

    html = `<div id="wrapper">${html}</div>`;

    return html;
  }

  render({ container, data }: { container: HTMLElement; data: AppDataType.Data }) {
    const html = this.getHTML(data);

    this.container = container;
    this.container.innerHTML = html;
  }

  registerDOM(): ComponentType.EventRegistry[] {
    return [
      {
        id: 'main',
        el: 'container',
        type: 'click',
        listener: 'handleClick',
      },
    ];
  }

  handleClick(event: MouseEvent) {
    const { target } = event;

    if (target instanceof HTMLButtonElement) {
      console.log(target.dataset.quizSubject);
    }
  }
}
