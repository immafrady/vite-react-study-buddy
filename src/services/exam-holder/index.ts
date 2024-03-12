import { IRecord } from '@/db/models/record/types'
import { Record } from '@/db/models/record'
import { QuestionType } from '@/db/models/question/types'

export interface IExamHolderConfig {
  classifyId: number
  types: QuestionType[]
  count: number
}

export class ExamHolder {
  private record: IRecord

  constructor(private config: IExamHolderConfig) {
    this.record = new Record(config.classifyId, [], [], new Date())
  }

  loadQuestions(count: number) {

  }
}
