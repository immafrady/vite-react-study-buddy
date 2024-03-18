import React from 'react'
import { CommonCard } from '@/pages/answer-sheet/cards/types'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { AnswerSheetContext } from '@/pages/answer-sheet/context'
import { QuestionType } from '@/db/models/question/types'
import SingleSelect from '@/pages/answer-sheet/cards/SelectQuizCard/SingleSelect'
import MultipleSelect from '@/pages/answer-sheet/cards/SelectQuizCard/MultipleSelect'

const SelectQuizCard: React.FC<CommonCard> = ({ idx, onNext, ...cardProps }) => {
  const controller = React.useContext(AnswerSheetContext)
  const question = React.useMemo(() => {
    return controller?.questions[idx - 1]
  }, [controller?.questions, idx])

  const [value, setValue] = React.useState('')
  return <Card {...cardProps}>
      <CardContent>
        <Typography variant={'body2'} color={'text.secondary'}>({idx}/{controller?.questions.length} {question?.type})</Typography>
        <Typography variant={'body1'} color={'text.primary'} gutterBottom textAlign={'justify'}>{ question?.problem }</Typography>

        {question?.type === QuestionType.Single && <SingleSelect options={question.options} onChange={(value) => setValue(value)} />}
        {question?.type === QuestionType.Judge && <SingleSelect options={{ Y: '正确', X: '错误'}} onChange={(value) => setValue(value)} hideValueBeforeAnswer />}
        {question?.type === QuestionType.Multiple && <MultipleSelect options={question.options} onChange={(value) => setValue(value)} />}
      </CardContent>
      <CardActions>
        <Button onClick={() => onNext()}>提交</Button>
      </CardActions>
  </Card>
}

export default SelectQuizCard
