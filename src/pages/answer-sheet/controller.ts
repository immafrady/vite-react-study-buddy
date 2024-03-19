import { AppDatabase } from '@/db'
import { ExamController } from '@/services/exam-controller/types'
import { ExamControllerConfig, genExamController } from '@/services/exam-controller'
import { useDatabase } from '@/stores/use-database'

export class AnswerSheetController {
  constructor(config: ExamControllerConfig) {
    this.examController = genExamController(config)
    this.db = useDatabase.getState().db
  }

  private db: AppDatabase
  private examController!: ExamController // 从fromConfig来的会有examController？
  get showInfo() { return this.examController.showInfo }
  get showAnswer() { return this.examController.showAnswer }
  get questions() { return this.examController.questions }

  private isStarted = false
  async start() {
    if (!this.isStarted) {
      this.isStarted = true
      await this.examController.newRecord()
      await this.examController.loadQuestions()
      console.log(this.examController.questions)
    }
  }

  async updateRecord(questionId: number, answer: string, isCorrect: boolean) {
    this.examController.record.questionIds.push(questionId)
    this.examController.record.questionAnswers.push(answer)
    if (!isCorrect) {
      this.examController.record.wrongQuestionIds.push(questionId)
    }
    await this.db.records.update(this.examController.record.id, {
      wrongQuestionIds: this.examController.record.wrongQuestionIds,
      questionAnswers: this.examController.record.questionAnswers,
      questionIds: this.examController.record.questionIds,
      updateDate: new Date()
    })
  }
}
