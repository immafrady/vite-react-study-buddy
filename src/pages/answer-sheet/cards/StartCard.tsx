import React from 'react'
import { CommonCard } from '@/pages/answer-sheet/cards/types'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { AnswerSheetContext } from '@/pages/answer-sheet/context'

const StartCard: React.FC<CommonCard> = React.forwardRef(({ inactive, onNext, ...cardProps }, ref) => {
  const controller = React.useContext(AnswerSheetContext)
  const [clicked, setClicked] = React.useState(false)

  return <Card ref={ref} {...cardProps} >
    <CardContent>
      <Typography variant={'h6'} textAlign={'center'}>
        准备好了吗？让我们开始吧！
      </Typography>
    </CardContent>
    <CardActions>
      { !clicked ? <Button fullWidth size={'large'} onClick={async () => {
        await controller?.start()
        onNext()
        setClicked(true)
      }}>Start!</Button> : <Typography variant={'h6'} color={'success.light'} textAlign={'center'} width={'100%'}>Go! Go! Go!</Typography> }

    </CardActions>
  </Card>
})

export default StartCard
