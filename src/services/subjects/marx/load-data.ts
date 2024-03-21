import { loadJsonData } from '@/services/subjects/load-json-data'
import { AppDatabase } from '@/db'
import { ClassName } from '@/db/models/classify/types'
import { QuestionType } from '@/db/models/question/types'

export const loadMarxData = (db: AppDatabase) => loadJsonData(db, {
  name: ClassName.Marx,
  types: [QuestionType.Judge, QuestionType.Multiple, QuestionType.Single],
  basePath: 'marx'
})
