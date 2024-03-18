import { ExamController } from '@/services/exam-controller/types'
import { IRecord } from '@/db/models/record/types'
import { IQuestion, QuestionType } from '@/db/models/question/types'
import { AppDatabase } from '@/db'
import { useDatabase } from '@/stores/use-database'
import { Record } from '@/db/models/record'
import questionsOp from '@/services/data-operations/questions';
import { pick, shuffle } from '@/helpers/array'

export class NormalExam implements ExamController {
  constructor(
    private classifyId: number,
    private types: QuestionType[],
    private count: number
  ) {
  }

  readonly showInfo: boolean = true
  readonly showAnswer: boolean = true

  private db: AppDatabase = useDatabase.getState().db
  record!: IRecord
  questions: IQuestion[] = []

  async newRecord() {
    this.record = new Record(this.classifyId, [], [], new Date())
    this.record.id = await this.db.records.add(this.record)
  }

  async loadQuestions() {
    const qs = await questionsOp.loaders.byClassifyIdAndTypes(this.classifyId, this.types)
    const groupBys = questionsOp.handlers.groupBy(qs, 'count')
    this.questions = []
    let count = this.count
    for (let i = 0; i < groupBys.length && count > 0; i++) {
      const group = groupBys[i]
      if (group[1].length < count) {
        // 因为count包含了这一批的，所以拿全部
        this.questions.push(...group[1])
        count -= group[1].length
      } else {
        // 随机取
        this.questions.push(...pick(group[1], count))
        count = 0
      }
    }
    shuffle(this.questions)
  }
}
