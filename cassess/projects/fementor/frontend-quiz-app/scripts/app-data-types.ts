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
