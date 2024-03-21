import { ExamType } from '@/services/exam-service/types'

export interface ExamConfigState {
  modeName: string
  modeExplain: string
  type: ExamType
}
