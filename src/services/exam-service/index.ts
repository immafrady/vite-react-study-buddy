import { ExamService, ExamType } from './types'
import { QuestionType } from '@/db/models/question/types'
import { NormalES } from './exams/normal'
import { ReviewES } from './exams/review'
import { ExamES } from '@/services/exam-service/exams/exam'

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
      return new NormalES(payload.classifyId, payload.types, payload.count)
    case ExamType.Exam:
      return new ExamES(payload.classifyId, payload.types, payload.count)
    case ExamType.Review:
      return new ReviewES(payload.recordId)
  }
}
