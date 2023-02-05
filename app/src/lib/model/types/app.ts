import type { ActionAPIs } from '../service/api';

interface QuizAnswer {
  text: string;
  isCorrect?: true;
}

interface QuizData {
  question: string;
  task: {
    apiId: ActionAPIs;
    args: ReturnType<ActionAPIs['args']>;
  };
  answers: QuizAnswer[];
}

type QuizResult = QuizAnswer[];

export type { QuizAnswer, QuizData, QuizResult };
