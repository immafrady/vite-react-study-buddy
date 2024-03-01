import { IQuestion } from '@/db/models/question/types';
import { IRecord } from './types';

export class Index implements IRecord {
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

  loadQuestions() {
    // todo 加载问题
  }
}
