import { IRecord } from '@/db/models/record/types'
import { IQuestion } from '@/db/models/question/types'

export enum ExamType {
  Normal, // 普通模式
  Exam, // 考试模式
  Review, // 复习模式
}

export enum ExamState {
  Prepare, // 准备中
  Ongoing, // 进行中
  Finish // 结束
}

export interface ExamController {
  state: ExamState
  record: IRecord
  questions: IQuestion[]
  // 特定的配置
  showInfo: boolean // 展示题目相关信息
  showAnswer: boolean // 展示答案

  // 加载考题
  newRecord(): Promise<void>
  // 抽取考题
  loadQuestions(): Promise<void>
}
