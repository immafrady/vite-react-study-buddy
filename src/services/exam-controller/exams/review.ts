import { ExamController, ExamState } from '@/services/exam-controller/types'
import { IRecord } from '@/db/models/record/types'
import { AppDatabase } from '@/db'
import { useDatabase } from '@/stores/use-database'
import { IQuestion } from '@/db/models/question/types'
import { Record } from '@/db/models/record'

export class ReviewExam implements ExamController {
  constructor(
    private recordId: number,
  ) {}

  state = ExamState.Prepare
  readonly showInfo: boolean = true
  readonly showAnswer: boolean = true

  private db: AppDatabase = useDatabase.getState().db
  record!: Record
  questions: IQuestion[] = []

  async newRecord() {
    this.record = (await this.db.records.get(this.recordId))! as Record
  }

  async loadQuestions() {
    return
  }
}
