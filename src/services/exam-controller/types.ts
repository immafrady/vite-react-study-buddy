import { Question } from '@/db/models/question'

export enum ExamType {
  Normal, // 普通模式
  Exam, // 考试模式
  Review, // 复习模式
}

export interface ExamController {
  // 抽取考题
  picker(questions: Question[], count: number): Question[]
}
