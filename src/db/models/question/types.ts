export interface IQuestion {
  id: number
  classifyId: number
  problem: string // 题干
  answer: string // 答案
  options: any //
  like: boolean
  count: number
  wrongCount: number
  type: QuestionType
}

export enum QuestionType {
  Multiple = 'MULTIPLE',
  Single = 'SINGLE',
  JUDGE = 'Judge'
}
