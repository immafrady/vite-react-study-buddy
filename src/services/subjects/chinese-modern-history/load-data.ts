import { AppDatabase } from '@/db'
import { loadJsonData } from '@/services/subjects/load-json-data'
import { ClassName } from '@/db/models/classify/types'
import { QuestionType } from '@/db/models/question/types'

export const loadChineseModernHistoryData = (db: AppDatabase) => loadJsonData(db, {
  name: ClassName.ChineseModernHistory,
  types: [QuestionType.Judge, QuestionType.Multiple, QuestionType.Single],
  basePath: 'chinese-modern-history',
})
