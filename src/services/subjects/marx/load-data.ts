import { AppDatabase } from '@/db'
import { ClassName } from '@/db/models/classify/types'
import { Classify } from '@/db/models/classify'
import { Question } from '@/db/models/question'
import { QuestionType } from '@/db/models/question/types'

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

async function loadJson<T>(type: string): Promise<T[]> {
  const resp = await fetch(`/data/marx/${type}.json`, { method: 'get' })
  return await resp.json() as T[]
}

export const loadJudgeQuestions = () => loadJson<JudgeQuestion>('judge')
export const loadSingleQuestions = () => loadJson<SelectQuestion>('single')
export const loadMultipleQuestions = () => loadJson<SelectQuestion>('multiple')

const selectQuestionParser = (source: SelectQuestion) => {
  return {
    A: source.A,
    B: source.B,
    C: source.C,
    D: source.D,
  }
}


export const loadMarxData = async (db: AppDatabase) => {
  const marx = await db.classifies.where({ name: ClassName.Marx }).first()
  if (!marx) {
    const classify = new Classify(ClassName.Marx)
    const classifyId = await db.classifies.add(classify.toDBJson())

    const [judges, singles, multiples] = await Promise.all([
      loadJson<JudgeQuestion>('judge'),
      loadJson<SelectQuestion>('single'),
      loadJson<SelectQuestion>('multiple'),
    ])

    db.transaction('rw', db.questions, async () => {
      db.questions.bulkAdd(judges.map((judge) => new Question(
        classifyId,
        judge.problem,
        judge.answer,
        null,
        QuestionType.JUDGE
        ).toDBJson()))
      db.questions.bulkAdd(singles.map((single) => new Question(
        classifyId,
        single.problem,
        single.answer,
        selectQuestionParser(single),
        QuestionType.Single
      ).toDBJson()))
      db.questions.bulkAdd(multiples.map((multiple) => new Question(
        classifyId,
        multiple.problem,
        multiple.answer,
        selectQuestionParser(multiple),
        QuestionType.Multiple
      ).toDBJson()))
    }).catch((reason) => {
      console.error(reason)
    })
  }
}
