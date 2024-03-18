import { ExamType } from '@/services/exam-controller/types'

export interface ExamConfigState {
  modeName: string
  modeExplain: string
  type: ExamType
}
