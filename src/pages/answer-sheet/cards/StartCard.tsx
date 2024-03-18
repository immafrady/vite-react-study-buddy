import React from 'react'
import { CommonCard } from '@/pages/answer-sheet/cards/types'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { AnswerSheetContext } from '@/pages/answer-sheet/context'

const StartCard: React.FC<CommonCard> = ({ inactive, onNext, ...cardProps }) => {
  const controller = React.useContext(AnswerSheetContext)
  const [clicked, setClicked] = React.useState(false)

  return <Card {...cardProps} >
    <CardContent>
      <Typography variant={'h6'} textAlign={'center'}>
        准备好了吗？让我们开始吧！
      </Typography>
    </CardContent>
    <CardActions>
      { !clicked ? <Button onClick={async () => {
        await controller?.start()
        onNext()
        setClicked(true)
      }}>Start!</Button> : <Typography variant={'body1'} color={'primary.main'} textAlign={'center'} width={'100%'}>Go!Go!Go!</Typography> }

    </CardActions>
  </Card>
}

export default StartCard
