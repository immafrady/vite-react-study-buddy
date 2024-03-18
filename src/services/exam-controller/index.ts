import { ExamController, ExamType } from './types'
import { NormalExam } from '@/services/exam-controller/exams/normal'
import { QuestionType } from '@/db/models/question/types'
import { ReviewExam } from '@/services/exam-controller/exams/review'

export type ExamControllerConfig = {
  type: ExamType.Normal | ExamType.Exam
  classifyId: number
  types: QuestionType[]
  count: number
} | {
  type: ExamType.Review
  recordId: number
}

export const genExamController = (payload: ExamControllerConfig): ExamController => {
  switch (payload.type) {
    case ExamType.Normal:
      return new NormalExam(payload.classifyId, payload.types, payload.count)
    case ExamType.Exam: // todo
      return new NormalExam(payload.classifyId, payload.types, payload.count)
    case ExamType.Review:
      return new ReviewExam(payload.recordId)
  }
}
