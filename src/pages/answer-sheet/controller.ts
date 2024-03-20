import { AppDatabase } from '@/db'
import { ExamController, ExamState } from '@/services/exam-controller/types'
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
  get score() {
    const doneCount = this.examController.record.questionIds.length
    const rightCount = doneCount - this.examController.record.wrongQuestionIds.length
    return Math.floor(rightCount / doneCount * 100)
  }

  private isStarted = false
  async start() {
    if (!this.isStarted) {
      this.isStarted = true
      await this.examController.newRecord()
      await this.examController.loadQuestions()
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

  // 推进到下一个状态
  setExamState(state: ExamState) {
    this.examController.state = state
  }
}
