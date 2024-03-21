import { ExamService, ExamState } from '@/services/exam-service/types'
import { QuestionType } from '@/db/models/question/types'
import { AppDatabase } from '@/db'
import { useDatabase } from '@/stores/use-database'
import { Record } from '@/db/models/record'
import { Question } from '@/db/models/question'
import { RecordType } from '@/db/models/record/types'
import questionsOp from '@/services/data-operations/questions'
import { pick } from '@/helpers/array'

export class ExamES implements ExamService {
  constructor(
    private classifyId: number,
    private types: QuestionType[],
    private count: number,
  ) {}

  state = ExamState.Prepare
  get showInfo() { return this.state === ExamState.Finish }
  get showAnswer() { return this.state === ExamState.Finish }

  private db: AppDatabase = useDatabase.getState().db
  record!: Record
  questions: Question[] = []

  async newRecord() {
    this.record = new Record(this.classifyId, RecordType.Exam, [], [], [], new Date())
    this.record.id = await this.db.records.add(this.record.toDBJson())
  }

  async loadQuestions() {
    const qs = (await questionsOp.loaders.byClassifyIdAndTypes(this.classifyId, this.types)) as Question[]
    this.questions = pick(qs, this.count)
  }
}
