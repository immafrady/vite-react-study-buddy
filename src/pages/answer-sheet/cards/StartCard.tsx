import React from 'react'
import { CommonCard } from '@/pages/answer-sheet/cards/types'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'

const StartCard: React.FC<CommonCard> = ({ inactive, onNext, ...cardProps }) => {
  return <Card {...cardProps} >
    <CardContent>
      <Typography variant={'h6'}>
        准备好了吗？让我们开始吧！
      </Typography>
    </CardContent>
    <CardActions>
      <Button onClick={() => {
        onNext()
      }}>Start!</Button>
    </CardActions>
  </Card>
}

export default StartCard
