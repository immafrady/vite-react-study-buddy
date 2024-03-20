import React, { useMemo } from 'react'
import { CommonCard } from '@/pages/answer-sheet/cards/types'
import { Button, Card, CardActions, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material'
import { AnswerSheetContext } from '@/pages/answer-sheet/context'
import { QuestionType } from '@/db/models/question/types'
import SingleSelect from '@/pages/answer-sheet/cards/SelectQuizCard/SingleSelect'
import MultipleSelect from '@/pages/answer-sheet/cards/SelectQuizCard/MultipleSelect'
import Box from '@mui/material/Box'
import { Favorite } from '@mui/icons-material'
import { Question } from '@/db/models/question'
import { useForceUpdate } from '@/hooks/use-force-update'

enum CardState {
  Edit, // 答题状态
  View, // 检查答案状态
  End // 终态
}

const SelectQuizCard: React.FC<CommonCard> = ({ idx, onNext, ...cardProps }) => {
  const controller = React.useContext(AnswerSheetContext)
  const question = React.useMemo(() => {
    return controller?.questions[idx - 1] as Question
  }, [controller?.questions, idx])
  const forceUpdate = useForceUpdate()

  const [value, setValue] = React.useState('')
  const [state, setState] = React.useState<CardState>(CardState.Edit)
  const answerColor = useMemo(() => value === question?.answer ? 'success.light' : 'error.light', [value, question?.answer])
  const cardConfig = useMemo(() => {
    const resultBorderColor = controller?.showAnswer ? answerColor : 'transparent'
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
  }, [controller?.showAnswer, state, answerColor])

  return <Card {...cardProps} sx={{ borderBottom: '2px solid transparent', borderColor: cardConfig.borderColor }}>
      <CardContent>
        <Typography variant={'body2'} color={'text.secondary'}>({idx}/{controller?.questions.length} {question?.type})</Typography>
        <Typography variant={'body1'} color={'text.primary'} gutterBottom textAlign={'justify'}>{ question?.problem }</Typography>

        {question?.type === QuestionType.Single && <SingleSelect disabled={cardConfig.disableSelect} options={question.options} onChange={(value) => setValue(value)} />}
        {question?.type === QuestionType.Judge && <SingleSelect disabled={cardConfig.disableSelect} options={{ Y: '正确', X: '错误'}} onChange={(value) => setValue(value)} />}
        {question?.type === QuestionType.Multiple && <MultipleSelect disabled={cardConfig.disableSelect} options={question.options} onChange={(value) => setValue(value)} />}

      </CardContent>
      <CardActions>
        <Stack width={'100%'} alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'}>
          <Box>
            { cardConfig.btnText && <Button size={'large'} disabled={!value} onClick={async () => {
              if (state === CardState.Edit) {
                const isCorrect = value === question!.answer
                await controller?.updateRecord(question!.id, value, isCorrect)
                if (controller?.showAnswer && !isCorrect) { // 展示答案的话，会确认过再去下一题（然后正确的场景会跳过）
                  setState(CardState.View)
                  return
                }
              }
              // 其他状态会去到终态
              setState(CardState.End)
              onNext()
            }}>{cardConfig.btnText}</Button>}
          </Box>
          <Stack alignItems={'center'} gap={1} flexDirection={'row'}>
            {controller?.showAnswer && state !== CardState.Edit && <Typography variant={'body2'} color={answerColor}>答案：{question?.answer}</Typography> }
            <IconButton size={'small'} onClick={async () => {
              await question.toggleLike()
              forceUpdate()
            }}><Favorite color={question.like ? 'warning' : 'disabled'}/></IconButton>
          </Stack>
        </Stack>

      </CardActions>
  </Card>
}

export default SelectQuizCard
