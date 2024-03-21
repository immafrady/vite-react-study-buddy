import { IconButton, Slide, Stack, useTheme } from '@mui/material'
import React from 'react'
import { Location, useLocation, useNavigate } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'
import StartCard from '@/pages/answer-sheet/cards/StartCard'
import Box from '@mui/material/Box'
import { RouterName } from '@/router/types'
import { AnswerSheetController } from '@/pages/answer-sheet/controller'
import AnswerSheetProvider from '@/pages/answer-sheet/context'
import { useMounted } from '@/hooks/use-mounted'
import { ExamControllerConfig } from '@/services/exam-controller'
import SelectQuizCard from '@/pages/answer-sheet/cards/SelectQuizCard/index'
import ResultCard from '@/pages/answer-sheet/cards/ResultCard'
import { ExamState } from '@/services/exam-controller/types'
import { useCardList } from '@/pages/answer-sheet/use-card-list'
import { ArrowCircleDown, ArrowCircleUp } from '@mui/icons-material'

/**
 * todo start之后，end之前，window.unload要加拦截
 */
const AnswerSheet = () => {
  const location: Location<ExamControllerConfig> = useLocation();
  const navigate = useNavigate()
  const theme = useTheme()

  const [controller, setController] = React.useState<AnswerSheetController|undefined>()
  const [examState, setExamState] = React.useState(ExamState.Prepare)

  const [cardListState, cardListDispatch] = useCardList([StartCard])

  // 在答题过程中，退出会有提示
  React.useEffect(() => {
    const handleBeforeUnload = (event: WindowEventMap['beforeunload']) => {
      event.preventDefault()
    };
    if (examState === ExamState.Ongoing) {
      window.addEventListener('beforeunload', handleBeforeUnload)
    }
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [examState])

  // 初始化函数
  useMounted(async () => {
    if (location.state) {
      const controller = new AnswerSheetController(location.state)
      setController(controller)
    } else {
      navigate(RouterName.Home)
    }
  })

  // 下一步按钮
  const onNext = () => {
    if (controller) {
      if (controller.questions.length + 1> cardListState.cards.length) {
        controller.setExamState(ExamState.Ongoing)
        setExamState(ExamState.Ongoing)
        cardListDispatch({ type: 'add', card: SelectQuizCard })
      } else {
        controller.setExamState(ExamState.Finish)
        setExamState(ExamState.Finish)
        cardListDispatch({ type: 'add', card: ResultCard })
      }
    }
  }

  // 视图相关操作
  const stackRef = React.useRef<HTMLDivElement>(null)
  const [tY, setTy] = React.useState<number>(0)
  const [viewH, setViewH] = React.useState(0)

  React.useEffect(() => {
    const ro = new ResizeObserver(entries => {
      requestAnimationFrame(() => {
        if (stackRef.current) {
          const children = stackRef.current.children
          let height = 0
          let isFirst = true
          for (let i = cardListState.page; i < children.length; i++) {
            const offsetHeight = (children[i] as HTMLDivElement).offsetHeight
            if (isFirst) { // 第一个要减半
              isFirst = false
              height += offsetHeight / 2
              setViewH(offsetHeight)
            } else {
              height += offsetHeight + parseFloat(getComputedStyle(children[i]).marginTop)
            }
          }
          setTy(height)
        }
      })
    })

    stackRef.current && ro.observe(stackRef.current)
    return () => {
      stackRef.current && ro.unobserve(stackRef.current)
    }
  }, [cardListState.page])

  return <AnswerSheetProvider value={controller}>
    <Box sx={{ position: 'relative', height: '100%', overflowY: 'visible', overflowX: 'visible' }}>
      <Stack ref={stackRef} spacing={2} justifyContent={'flex-end'} sx={{
        position: 'absolute',
        width: '100%',
        bottom: '50%',
        transform: `translateY(${tY}px)`,
        transition: examState === ExamState.Finish ? 'transform 0.2s ease-in-out' : '',
        '&::after': {
          display: 'block',
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          width: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 },
          height: '100%',
          backgroundColor: 'text.secondary',
          zIndex: -1,
        }
      }}>
        <TransitionGroup component={null}>
          { cardListState.cards.map((component, idx) => <Slide direction={'up'} mountOnEnter unmountOnExit key={idx}>
            { React.createElement(component, {
              key: idx,
              idx,
              elevation: 3,
              onNext,
            }) }
          </Slide>) }
        </TransitionGroup>
      </Stack>
      { viewH && <>
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: `calc((100vh - ${theme.mixins.toolbar.minHeight}px - ${viewH}px) / 2 + ${theme.mixins.toolbar.minHeight}px)`,
          background: `linear-gradient(to bottom, ${theme.palette.background.paper} 50%, transparent)`,
        }}></Box>
        <Box sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: `calc((100vh - ${theme.mixins.toolbar.minHeight}px - ${viewH}px) / 2)`,
          background: `linear-gradient(to bottom, transparent, ${theme.palette.background.paper} 50%)`,
        }}>
          {examState === ExamState.Finish && <Stack flexDirection={'row'} justifyContent={'center'} gap={5} sx={{
            position: 'absolute',
            width: '100%',
            bottom: {xs: 5, sm: 10, md: 15, lg: 20, xl: 25},
          }}>
            <IconButton color={'secondary'} size={'large'} onClick={() => cardListDispatch({type: 'move-down'})}><ArrowCircleUp/></IconButton>
            <IconButton color={'secondary'} size={'large'} onClick={() => cardListDispatch({type: 'move-up'})}><ArrowCircleDown/></IconButton>
          </Stack>}
        </Box>
      </> }

    </Box>
  </AnswerSheetProvider>
}

export default AnswerSheet;
