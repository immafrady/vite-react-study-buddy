import React from 'react'
import { AnswerSheetController } from '@/pages/answer-sheet/controller'

export const AnswerSheetContext = React.createContext<AnswerSheetController|undefined>(undefined)

const AnswerSheetProvider: React.FC<{ value?: AnswerSheetController, children: React.ReactNode }> = ({ value, children }) => {


    return <AnswerSheetContext.Provider value={value}>{children}</AnswerSheetContext.Provider>
}

export default AnswerSheetProvider
