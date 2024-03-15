import React, { useContext } from 'react'
import { CommonCard } from '@/pages/answer-sheet/cards/types'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { AnswerSheetContext } from '@/pages/answer-sheet/context'

const StartCard: React.FC<CommonCard> = ({ inactive, onNext, ...cardProps }) => {
  const controller = useContext(AnswerSheetContext)

  return <Card {...cardProps} >
    <CardContent>
      <Typography variant={'h6'}>
        准备好了吗？让我们开始吧！
      </Typography>
    </CardContent>
    <CardActions>
      <Button onClick={() => {
        controller?.start()
        onNext()
      }}>Start!</Button>
    </CardActions>
  </Card>
}

export default StartCard
