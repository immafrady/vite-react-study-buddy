import { IQuestion } from '@/db/models/question/types';
import { ClassName, IClassify } from './types';

export class Classify implements IClassify {
  questions: IQuestion[] = []

  constructor(
    public id: number,
    public name: ClassName
  ) {}

  loadQuestions(count: number) {
    // todo 加载问题
  }
}
