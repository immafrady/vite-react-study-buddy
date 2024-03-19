import React, { useMemo } from 'react'
import { CommonCard } from '@/pages/answer-sheet/cards/types'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { AnswerSheetContext } from '@/pages/answer-sheet/context'
import { QuestionType } from '@/db/models/question/types'
import SingleSelect from '@/pages/answer-sheet/cards/SelectQuizCard/SingleSelect'
import MultipleSelect from '@/pages/answer-sheet/cards/SelectQuizCard/MultipleSelect'

enum CardState {
  Edit, // 答题状态
  View, // 检查答案状态
  End // 终态
}

const SelectQuizCard: React.FC<CommonCard> = ({ idx, onNext, ...cardProps }) => {
  const controller = React.useContext(AnswerSheetContext)
  const question = React.useMemo(() => {
    return controller?.questions[idx - 1]
  }, [controller?.questions, idx])

  const [value, setValue] = React.useState('')
  const [state, setState] = React.useState<CardState>(CardState.Edit)
  const cardConfig = useMemo(() => {
    const resultBorderColor = controller?.showAnswer ? (value === question?.answer ? 'success.light' : 'error.light') : 'transparent'
    switch (state) {
      case CardState.Edit:
        return {
          btnText: '提交答案',
          disableSelect: false,
          borderColor: 'transparent',
        }
      case CardState.View:
        return {
          btnText: '下一步',
          disableSelect: true,
          borderColor: resultBorderColor
        }
      case CardState.End:
        return {
          btnText: '', // 不显示按钮了
          disableSelect: true,
          borderColor: resultBorderColor
        }
    }
  }, [controller?.showAnswer, value, question?.answer, state])

  return <Card {...cardProps} sx={{ border: '2px solid transparent', borderColor: cardConfig.borderColor }}>
      <CardContent>
        <Typography variant={'body2'} color={'text.secondary'}>({idx}/{controller?.questions.length} {question?.type})</Typography>
        <Typography variant={'body1'} color={'text.primary'} gutterBottom textAlign={'justify'}>{ question?.problem }</Typography>

        {question?.type === QuestionType.Single && <SingleSelect disabled={cardConfig.disableSelect} options={question.options} onChange={(value) => setValue(value)} />}
        {question?.type === QuestionType.Judge && <SingleSelect disabled={cardConfig.disableSelect} options={{ Y: '正确', X: '错误'}} onChange={(value) => setValue(value)} hideValueBeforeAnswer />}
        {question?.type === QuestionType.Multiple && <MultipleSelect disabled={cardConfig.disableSelect} options={question.options} onChange={(value) => setValue(value)} />}
      </CardContent>
      <CardActions>
        { cardConfig.btnText && <Button size={'large'} onClick={async () => {
          if (state === CardState.Edit) {
              await controller?.updateRecord(question!.id, value, value === question!.answer)
            if (controller?.showAnswer) { // 展示答案的话，会确认过再去下一题
              setState(CardState.View)
              return
            }
          }
          // 其他状态会去到终态
          setState(CardState.End)
          onNext()
        }}>{cardConfig.btnText}</Button>}
      </CardActions>
  </Card>
}

export default SelectQuizCard
