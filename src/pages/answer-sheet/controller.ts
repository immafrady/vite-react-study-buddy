import { QuestionType } from '@/db/models/question/types'
import { IRecord } from '@/db/models/record/types'
import { useDatabase } from '@/stores/use-database'
import { Record } from '@/db/models/record'

export interface IAnswerSheetControllerConfig {
  classifyId: number
  types: QuestionType[]
  count: number
}

export class AnswerSheetController {
  public record!: IRecord

  // 从已有记录new
  static async fromRecord(recordId: number) {
    const db = useDatabase.getState().db
    const record = (await db.records.get(recordId))!
    return new AnswerSheetController()
  }

  // 从配置new
  static async fromConfig(config: IAnswerSheetControllerConfig ) {
    const db = useDatabase.getState().db
    const controller = new AnswerSheetController()
    controller.record = new Record(config.classifyId, [], [], new Date())
    controller.record.id = await db.records.add(controller.record)
    return controller
  }

  loadQuestions() {

  }

}
