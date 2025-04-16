export namespace AppDataType {
  export interface Question {
    answer: string;
    options: string[];
    question: string;
  }

  export interface Subject {
    icon: string;
    questions: Question[];
    title: string;
  }

  export interface Data {
    quizzes: Subject[];
  }
}

class AppData {
  async getAppData(): Promise<AppDataType.Data> {
    // TODO: error handling
    const response = await fetch('../../../fementor-frontend-quiz-app-data.json');
    const data: AppDataType.Data = await response.json();

    return data;
  }
}

const data = new AppData();

export default data;
