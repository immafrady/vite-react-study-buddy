export interface IRecord {
  id: number
  type: RecordType
  classifyId: number
  questionIds: number[]
  questionAnswers: string[]
  wrongQuestionIds: number[]
  updateDate: Date
}

export enum RecordType {
  Normal = '普通',
  Exam = '考试',
  Review = '复习'
}
