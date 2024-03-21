import { ExamService, ExamState } from '../types'
import { AppDatabase } from '@/db'
import { useDatabase } from '@/stores/use-database'
import { Record } from '@/db/models/record'
import { Question } from '@/db/models/question'

export class ReviewExam implements ExamService {
  constructor(
    private recordId: number,
  ) {}

  state = ExamState.Prepare
  readonly showInfo: boolean = true
  readonly showAnswer: boolean = true

  private db: AppDatabase = useDatabase.getState().db
  record!: Record
  questions: Question[] = []

  async newRecord() {
    this.record = (await this.db.records.get(this.recordId))! as Record
  }

  async loadQuestions() {
    return
  }
}
