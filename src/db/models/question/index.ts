import { IQuestion, QuestionType } from './types';

export class Index implements IQuestion {
    constructor(
      public id: any,
      public classifyId: number,
      public q: string,
      public a: string,
      public detail: any,
      public like: boolean,
      public count: number,
      public wrongCount: number,
      public type: QuestionType,
    ) {}
}

