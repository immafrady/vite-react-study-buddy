import { IQuestion, QuestionType } from './types';
import { useDatabase } from '@/stores/use-database'

const db = useDatabase.getState().db

export class Question implements IQuestion {
    id!: number
    like: boolean = false
    count: number = 0
    wrongCount: number = 0
    constructor(
      public classifyId: number,
      public problem: string,
      public answer: string,
      public options: any,
      public type: QuestionType,
    ) {}

    toDBJson(): IQuestion {
        return {
            id: this.id,
            like: this.like,
            count: this.count,
            wrongCount: this.wrongCount,
            classifyId: this.classifyId,
            problem: this.problem,
            answer: this.answer,
            options: this.options,
            type: this.type,
        }
    }

    /**
     * 切换是否喜欢
     */
    toggleLike() {
        this.like = !this.like
        db.questions.update(this.id, { like: this.like})
    }

    /**
     * 登记做过
     * @param isWrong
     */
    markDone(isWrong: boolean) {
        if (isWrong) { this.wrongCount++ }
        this.count++
        db.questions.update(this.id, { wrongCount: this.wrongCount, count: this.count })
    }
}

