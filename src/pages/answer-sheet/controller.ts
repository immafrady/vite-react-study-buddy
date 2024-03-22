import { AppDatabase } from '@/db'
import { ExamService, ExamState } from '@/services/exam-service/types'
import { ExamServiceConfig, newExamService } from '@/services/exam-service'
import { useDatabase } from '@/stores/use-database'

export class AnswerSheetController {
  constructor(config: ExamServiceConfig) {
    this.examService = newExamService(config)
    this.db = useDatabase.getState().db
  }

  private db: AppDatabase
  private examService!: ExamService // 从fromConfig来的会有examController？
  get showInfo() { return this.examService.showInfo }
  get showAnswer() { return this.examService.showAnswer }
  get questions() { return this.examService.questions }
  get score() {
    return this.examService.record.score
  }

  private isStarted = false
  async start() {
    if (!this.isStarted) {
      this.isStarted = true
      await this.examService.newRecord()
      await this.examService.loadQuestions()
    }
  }

  async updateRecord(questionId: number, answer: string, isCorrect: boolean) {
    this.examService.record.questionIds.push(questionId)
    this.examService.record.questionAnswers.push(answer)
    if (!isCorrect) {
      this.examService.record.wrongQuestionIds.push(questionId)
    }
    await this.db.records.update(this.examService.record.id, {
      wrongQuestionIds: this.examService.record.wrongQuestionIds,
      questionAnswers: this.examService.record.questionAnswers,
      questionIds: this.examService.record.questionIds,
      updateDate: new Date()
    })
  }

  // 推进到下一个状态
  setExamState(state: ExamState) {
    this.examService.state = state
  }
}
