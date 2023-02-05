import { actionAPIs } from '$lib/model/service/api';
import type { QuizData } from '$lib/model/types/app';

export const quizData: QuizData[] = [
  {
    question: '問題1',
    task: {
      apiId: actionAPIs.approachObject,
      args: actionAPIs.approachObject.args('aibo')
    },
    answers: [
      {
        text: '答え1',
        isCorrect: true
      },
      { text: '答え2' },
      { text: '答え3' },
      { text: '答え4' }
    ]
  },
  {
    question: '問題2',
    task: {
      apiId: actionAPIs.approachPerson,
      args: actionAPIs.approachPerson.args(1)
    },
    answers: [
      {
        text: '答え1',
        isCorrect: true
      },
      { text: '答え2' },
      { text: '答え3' },
      { text: '答え4' }
    ]
  }
];
