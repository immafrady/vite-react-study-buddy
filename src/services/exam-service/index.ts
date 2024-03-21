import { ExamService, ExamType } from './types'
import { QuestionType } from '@/db/models/question/types'
import { NormalExam } from './exams/normal'
import { ReviewExam } from './exams/review'

export type ExamServiceConfig = {
  type: ExamType.Normal | ExamType.Exam
  classifyId: number
  types: QuestionType[]
  count: number
} | {
  type: ExamType.Review
  recordId: number
}

export const newExamService = (payload: ExamServiceConfig): ExamService => {
  switch (payload.type) {
    case ExamType.Normal:
      return new NormalExam(payload.classifyId, payload.types, payload.count)
    case ExamType.Exam: // todo
      return new NormalExam(payload.classifyId, payload.types, payload.count)
    case ExamType.Review:
      return new ReviewExam(payload.recordId)
  }
}
