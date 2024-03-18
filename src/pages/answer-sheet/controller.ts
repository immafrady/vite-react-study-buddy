import { AppDatabase } from '@/db'
import { ExamController } from '@/services/exam-controller/types'
import { ExamControllerConfig, genExamController } from '@/services/exam-controller'

export class AnswerSheetController {
  constructor(config: ExamControllerConfig) {
    this.examController = genExamController(config)
  }

  private db!: AppDatabase
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

}
