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
  const resp = await fetch(`/public/data/marx/${type}.json`, { method: 'get' })
  return await resp.json() as T[]
}

export const loadJudgeQuestions = () => loadJson<JudgeQuestion>('judge')
export const loadSingleQuestions = () => loadJson<SelectQuestion>('single')
export const loadMultipleQuestions = () => loadJson<SelectQuestion>('multiple')
