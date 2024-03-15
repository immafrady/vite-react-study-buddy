import { QuestionType } from '@/db/models/question/types'
import { IRecord } from '@/db/models/record/types'
import { useDatabase } from '@/stores/use-database'
import { Record } from '@/db/models/record'
import { AppDatabase } from '@/db'

export interface IAnswerSheetControllerConfig {
  classifyId: number
  types: QuestionType[]
  count: number
}

export class AnswerSheetController {
  private constructor() {}

  private db!: AppDatabase
  public record!: IRecord

  // 从已有记录new
  static async fromRecord(recordId: number) {
    const controller = new AnswerSheetController()
    controller.db = useDatabase.getState().db
    controller.record = (await controller.db.records.get(recordId))!
    return controller
  }

  // 从配置new
  static async fromConfig(config: IAnswerSheetControllerConfig ) {
    const controller = new AnswerSheetController()
    controller.db = useDatabase.getState().db
    controller.record = new Record(config.classifyId, [], [], new Date())
    return controller
  }

  async start() {
    if (!this.record.id) {
      this.record.id = await this.db.records.add(this.record)
    }
  }

  loadQuestions() {

  }

}
