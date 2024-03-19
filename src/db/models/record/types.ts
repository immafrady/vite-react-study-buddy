export interface IRecord {
  id: number
  classifyId: number
  questionIds: number[]
  questionAnswers: string[]
  wrongQuestionIds: number[]
  updateDate: Date
}
