import { AppDatabase } from '@/db'
import React, { useState } from 'react'
import { loadMarxData } from '@/services/subjects/marx/load-data'

export enum InitState {
  BeforeInit,
  Initializing,
  Initialized,
}
let db: AppDatabase = new AppDatabase()
let storedInitState: InitState = InitState.BeforeInit // 初始化状态
let lock = false

export const useDatabase = () => {
  const [initState, setInitState] = useState<InitState>(storedInitState)

  React.useEffect(() => {
    if (initState === InitState.BeforeInit && !lock) {
      lock = true // 防止重复调用
      setInitState(InitState.Initializing)

      ;(async () => {
        // 初始化过程
        try {
          if (!db.isOpen()) {
            await db.open()
          }
          await loadMarxData(db)

          setInitState(InitState.Initialized)
        } catch (e) {
        }
        lock = false // 释放锁
      })()
    }
  }, [])

  return {
    db,
    initState,
  }
}
