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
  Multiple = '多选题',
  Single = '单选题',
  Judge = '判断题'
}
