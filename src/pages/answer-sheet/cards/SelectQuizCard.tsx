import React, { useContext } from 'react'
import { CommonCard } from '@/pages/answer-sheet/cards/types'
import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material'
import { AnswerSheetContext } from '@/pages/answer-sheet/context'

const SelectQuizCard: React.FC<CommonCard> = () => {
  const controller = useContext(AnswerSheetContext)

  return <Card>
      <CardHeader></CardHeader>
      <CardContent>

      </CardContent>
      <CardActions>
        <Button>提交</Button>
      </CardActions>
  </Card>
}

export default SelectQuizCard
