import { IRecord, RecordType } from './types'

export class Record implements IRecord {
  id!: number

  constructor(
    public classifyId: number,
    public type: RecordType,
    public questionIds: number[],
    public wrongQuestionIds: number[],
    public questionAnswers: string[],
    public updateDate: Date
  ) {
  }

  toDBJson(): IRecord {
    return {
      id: this.id,
      classifyId: this.classifyId,
      type: this.type,
      questionIds: this.questionIds,
      wrongQuestionIds: this.wrongQuestionIds,
      questionAnswers: this.questionAnswers,
      updateDate: this.updateDate,
    }
  }

  loadQuestions() {
    // todo 加载问题
  }
}
