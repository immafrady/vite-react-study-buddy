import { useDatabase } from '@/stores/use-database'
import { QuestionType } from '@/db/models/question/types'
import { Question } from '@/db/models/question'

const db = useDatabase.getState().db

// 加载数据
const loaders = {
  /**
   * 通过类目ID和类型查出全部数据
   * @param classifyId
   * @param types
   */
  byClassifyIdAndTypes: (classifyId: number, types: QuestionType[], ) => {
    return db.questions
      .where(['classifyId', 'type'])
      .anyOf(types.map(type => [classifyId, type]))
      .toArray()
  },
  /**
   * 通过ID找出问题数据
   * @param ids
   */
  byIds:  (ids: number[]) => {
    return db.questions.where('id').anyOf(ids).toArray()
  }
}

// 处理数据
const handlers = {
  /**
   * 排序
   * @param questions
   * @param field
   * @param isAsc
   */
  orderBy: (questions: Question[], field: 'wrongCount'|'count', isAsc: boolean) => {
    return questions.sort((a, b) => {
      const aVal = a[field]
      const bVal = b[field]
      return isAsc ? aVal - bVal : bVal - aVal
    })
  },
  /**
   * 分组
   * @param questions
   * @param field
   */
  groupBy: (questions: Question[], field: 'wrongCount'|'count'): [number, Question[]][] => {
    const map = new Map<number, Question[]>()
    questions.forEach(q => {
      const count = q[field]
      if (map.has(count)) {
        map.get(count)?.push(q)
      } else {
        map.set(count, [q])
      }
    })

    return Array.from(map).sort((a, b) => a[0] - b[0])
  }
}

export default {
  loaders,
  handlers
}
