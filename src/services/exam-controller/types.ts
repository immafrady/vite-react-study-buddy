import { IRecord } from '@/db/models/record/types'
import { IQuestion } from '@/db/models/question/types'

export enum ExamType {
  Normal, // 普通模式
  Exam, // 考试模式
  Review, // 复习模式
}

export interface ExamController {
  record: IRecord
  questions: IQuestion[]
  newRecord(): Promise<void>
  // 抽取考题
  loadQuestions(): Promise<void>
}
