import { IQuestion, QuestionType } from './types';

export class Question implements IQuestion {
    id!: number
    like: boolean = false
    count: number = 0
    wrongCount: number = 0
    constructor(
      public classifyId: number,
      public problem: string,
      public answer: string,
      public options: any,
      public type: QuestionType,
    ) {}

    toDBJson(): IQuestion {
        return {
            id: this.id,
            like: this.like,
            count: this.count,
            wrongCount: this.wrongCount,
            classifyId: this.classifyId,
            problem: this.problem,
            answer: this.answer,
            options: this.options,
            type: this.type,
        }
    }
}

