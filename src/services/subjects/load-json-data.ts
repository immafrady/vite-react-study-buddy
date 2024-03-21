import { AppDatabase } from '@/db'
import { ClassName } from '@/db/models/classify/types'
import { Classify } from '@/db/models/classify'
import { Question } from '@/db/models/question'
import { QuestionType } from '@/db/models/question/types'
import { resourceBasename } from '@/helpers/project'
import questions from '@/services/data-operations/questions'

export interface JudgeQuestion {
  problem: string
  answer: string
}

export interface SelectQuestion {
  problem: string
  answer: string
  A: string
  B: string
  C: string
  D: string
}

async function loadJson<T>(type: string, basePath: string): Promise<T[]> {
  const resp = await fetch(`${resourceBasename}/data/${basePath}/${type}.json`, { method: 'get' })
  return await resp.json() as T[]
}

const selectQuestionParser = (source: SelectQuestion) => {
  return {
    A: source.A,
    B: source.B,
    C: source.C,
    D: source.D,
  }
}

const requestMap = {
  [QuestionType.Judge]: (basePath: string, classifyId: number) => loadJson<JudgeQuestion>('judge', basePath)
    .then((qs => qs.map(q => new Question(
      classifyId,
      q.problem,
      q.answer,
      null,
      QuestionType.Judge
    ).toDBJson()))),
  [QuestionType.Multiple]: (basePath: string, classifyId: number) => loadJson<SelectQuestion>('multiple', basePath)
    .then((qs: SelectQuestion[]) => qs.map(q => new Question(
      classifyId,
      q.problem,
      q.answer,
      selectQuestionParser(q),
      QuestionType.Multiple
    ).toDBJson())),
  [QuestionType.Single]: (basePath: string,  classifyId: number) =>  loadJson<SelectQuestion>('single', basePath)
    .then((qs: SelectQuestion[]) => qs.map(q => new Question(
      classifyId,
      q.problem,
      q.answer,
      selectQuestionParser(q),
      QuestionType.Single
    ).toDBJson())),
}

interface Config {
  name: ClassName
  types: QuestionType[]
  basePath: string
}

export const loadJsonData = async (db: AppDatabase, config: Config) => {
  let classify = await db.classifies.where({ name: config.name }).first() as Classify|undefined
  let classifyId: number
  if (classify) {
    classifyId = classify.id
    const count = await db.questions.where('classifyId').equals(classify.id).count()
    if (count > 0) {
      return // 这个已经加载过了，跳过
    }
  } else {
    classify = new Classify(config.name, config.types)
    classifyId =  await db.classifies.add(classify.toDBJson())
  }

  const res = await Promise.all(config.types.map(type => requestMap[type](config.basePath, classifyId)))
  db.transaction('rw', db.questions, async () => {
    res.forEach(questions => {
      db.questions.bulkAdd(questions)
    })
  }).catch((reason) => {
    console.error(reason)
  })
}
