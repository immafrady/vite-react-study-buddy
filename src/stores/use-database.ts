import { AppDatabase } from '@/db'
import { loadMarxData } from '@/services/subjects/marx/load-data'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export enum InitState {
  BeforeInit,
  Initializing,
  Initialized,
}
let db: AppDatabase = new AppDatabase()

export const useDatabase = create<{
  db: AppDatabase
  initState: InitState
  setInitState: (initState: InitState) => void
}>(
  combine(
    {
      db,
      initState: InitState.BeforeInit
    },
    set => ({
      setInitState: (initState: InitState) => {
        set({ initState: initState })
      }
    })
  )
)

;(async () => {
  const state = useDatabase.getState()
  if (state.initState === InitState.BeforeInit) {
    useDatabase.setState({ initState: InitState.Initializing })

    try {
      if (!state.db.isOpen()) {
        await state.db.open()
      }
      // 初始化数据库代码！
      await loadMarxData(state.db)
      useDatabase.setState({ initState: InitState.Initialized })
    } catch (e) {
      console.error(e)
      useDatabase.setState({ initState: InitState.BeforeInit })
    }
  }
})()
