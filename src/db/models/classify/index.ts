import { IQuestion } from '@/db/models/question/types';
import { ClassName, IClassify } from './types';

export class Classify implements IClassify {
  id!: number
  questions: IQuestion[] = []

  constructor(
    public name: ClassName
  ) {}

  toDBJson(): IClassify {
    return {
      id: this.id,
      name: this.name,
    }
  }

  loadQuestions(count: number) {
    // todo 加载问题
  }
}
