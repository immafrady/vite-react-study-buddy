import { IQuestion } from '@/db/models/question/types';
import { IRecord } from './types';

export class Record implements IRecord {
  questions: IQuestion[] = []
  wrongQuestions: IQuestion[] = []

  constructor(
    public id: number,
    public classifyId: number,
    public questionIds: number[],
    public wrongQuestionIds: number[],
    public updateDate: Date
  ) {
  }

  toDBJson(): IRecord {
    return {
      id: this.id,
      classifyId: this.classifyId,
      questionIds: this.questionIds,
      wrongQuestionIds: this.wrongQuestionIds,
      updateDate: this.updateDate,
    }
  }

  loadQuestions() {
    // todo 加载问题
  }
}
