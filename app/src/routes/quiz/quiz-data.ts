export interface QuizData {
  question: string;
  answers: Array<{
    text: string;
    isCorrect?: true;
  }>;
}

export const quizData: QuizData[] = [
  {
    question: '問題1',
    answers: [
      { text: '答え1', isCorrect: true },
      { text: '答え2' },
      { text: '答え3' },
      { text: '答え4' }
    ]
  },
  {
    question: '問題2',
    answers: [{ text: '答え1', isCorrect: true }, { text: '答え2' }, { text: '答え3' }]
  }
];
