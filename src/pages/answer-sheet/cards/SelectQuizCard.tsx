import React, { useContext, useMemo } from 'react'
import { CommonCard } from '@/pages/answer-sheet/cards/types'
import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import { AnswerSheetContext } from '@/pages/answer-sheet/context'

const SelectQuizCard: React.FC<CommonCard> = ({ idx, onNext, ...cardProps }) => {
  const controller = useContext(AnswerSheetContext)
  const question = useMemo(() => {
    return controller?.questions[idx - 1]
  }, [controller?.questions, idx])

  return <Card {...cardProps}>
      <CardContent>
        <Typography variant={'body2'} color={'text.secondary'}>({idx}/{controller?.questions.length} {question?.type})</Typography>
        <Typography variant={'body1'} color={'text.primary'} gutterBottom>{ question?.problem }</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => onNext()}>提交</Button>
      </CardActions>
  </Card>
}

export default SelectQuizCard
