import { QuestionType } from '@/db/models/question/types'
import { ClassName, IClassify } from './types';
import { Question } from '@/db/models/question'

export class Classify implements IClassify {
  id!: number
  questions: Question[] = []

  constructor(
    public name: ClassName,
    public questionTypes: QuestionType[],
  ) {}

  toDBJson(): IClassify {
    return {
      id: this.id,
      name: this.name,
      questionTypes: this.questionTypes,
    }
  }

  loadQuestions(count: number) {
    // todo 加载问题
  }
}
