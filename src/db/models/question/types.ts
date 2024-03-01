export interface IQuestion {
  id: number
  classifyId: number
  q: string
  a: string
  detail: any
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
