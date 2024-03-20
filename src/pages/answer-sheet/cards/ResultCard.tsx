import React from 'react'
import { CommonCard } from '@/pages/answer-sheet/cards/types'
import { AnswerSheetContext } from '@/pages/answer-sheet/context'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { RouterName } from '@/router/types'

const ResultCard: React.FC<CommonCard> = React.forwardRef(({ ...cardProps }, ref) => {
    const navigate = useNavigate()
    const controller = React.useContext(AnswerSheetContext)

    const color = React.useMemo(() => {
        const palette = [
            '#FF0000',
            '#F11700',
            '#E32E00',
            '#D54600',
            '#C75D00',
            '#B97400',
            '#AC8B00',
            '#9EA200',
            '#90B900',
            '#82D100',
            '#74E800',
            '#66FF00'
        ]
        let result = ''
        for (let i = 0; i < palette.length && controller?.score! > i*10; i++) {
            result = palette[i]
        }
        return result
    }, [controller?.score])
    return <Card ref={ref} {...cardProps} >
        <CardContent>
            <Typography variant={'h6'} textAlign={'center'}>恭喜完成答题</Typography>
            <Typography variant={'body2'} textAlign={'center'} color={'text.secondary'}>你的成绩是</Typography>
            <Typography variant={'h1'} textAlign={'center'} fontWeight={800} color={color}>{controller?.score}</Typography>
        </CardContent>
        <CardActions>
           <Button fullWidth onClick={() => location.reload()}>再来一次</Button>
           <Button fullWidth onClick={() => navigate(RouterName.Home)}>回到首页</Button>
        </CardActions>
    </Card>
})

export default ResultCard
