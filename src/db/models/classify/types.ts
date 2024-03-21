import { QuestionType } from '@/db/models/question/types'

export interface IClassify {
  id: number
  name: ClassName
  questionTypes: QuestionType[]
}

export enum ClassName {
  Marx = '马克思主义基本原理',
  ChineseModernHistory = '中国近现代史纲要'
}
