import { ExamService, ExamState } from '../types'
import { AppDatabase } from '@/db'
import { useDatabase } from '@/stores/use-database'
import { Record } from '@/db/models/record'
import { Question } from '@/db/models/question'
import { RecordType } from '@/db/models/record/types'

export class ReviewES implements ExamService {
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
    const record = (await this.db.records.get(this.recordId))! as Record
    this.record = new Record(record.classifyId, RecordType.Review, record.questionIds, [], [], new Date)
    this.record.id = await this.db.records.add(this.record.toDBJson())
  }

  async loadQuestions() {
    return
  }
}
