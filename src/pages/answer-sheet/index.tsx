import { Collapse, Stack } from '@mui/material'
import React from 'react'
import { useLocation, Location, useNavigate } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'
import StartCard from '@/pages/answer-sheet/cards/StartCard'
import { CommonCard } from '@/pages/answer-sheet/cards/types'
import Box from '@mui/material/Box'
import { RouterName } from '@/router/types'
import { AnswerSheetController } from '@/pages/answer-sheet/controller'
import AnswerSheetProvider from '@/pages/answer-sheet/context'
import { useMounted } from '@/hooks/use-mounted'
import { ExamControllerConfig } from '@/services/exam-controller'
import SelectQuizCard from '@/pages/answer-sheet/cards/SelectQuizCard/index'
import ResultCard from '@/pages/answer-sheet/cards/ResultCard'

/**
 * todo start之后，end之前，window.unload要加拦截
 */
const AnswerSheet = () => {
  const location: Location<ExamControllerConfig> = useLocation();
  const navigate = useNavigate()
  const [controller, setController] = React.useState<AnswerSheetController|undefined>()
  const [list, setList] = React.useState<React.FC<CommonCard>[]>([
    StartCard
  ])
  const [index, setIndex] = React.useState(0)

  useMounted(async () => {
    if (location.state) {
      const controller = new AnswerSheetController(location.state)
      setController(controller)
    } else {
      navigate(RouterName.Home)
    }
  })

  const onNext = () => {
    if (controller) {
      if (controller.questions.length + 1> list.length) {
        setList(list => [...list, SelectQuizCard])
      } else {
        setList(list => [...list, ResultCard])
      }
      setIndex(index => index + 1)
    }
  }

  const stackRef = React.useRef<HTMLDivElement>(null)
  const [tY, setTy] = React.useState<number>(0)

  React.useEffect(() => {
    const ro = new ResizeObserver(entries => {
      requestAnimationFrame(() => {
        if (stackRef.current) {
          const children = stackRef.current.children
          let height = 0
          let isFirst = true
          for (let i = index; i < children.length; i++) {
            const offsetHeight = (children[i] as HTMLDivElement).offsetHeight
            if (isFirst) { // 第一个要减半
              isFirst = false
              height += offsetHeight / 2
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
  }, [index])

  return <AnswerSheetProvider value={controller}>
    <Box sx={{ position: 'relative', height: '100%', overflowY: 'visible', overflowX: 'visible' }}>
      <Stack ref={stackRef} spacing={2} justifyContent={'flex-end'} sx={{
        position: 'absolute',
        width: '100%',
        bottom: '50%',
        transform: `translateY(${tY}px)`,
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
          { list.map((component, idx) => <Collapse key={idx}>
            { React.createElement(component, {
              key: idx,
              idx,
              elevation: 3,
              onNext,
            }) }
          </Collapse>) }
        </TransitionGroup>
      </Stack>
    </Box>
  </AnswerSheetProvider>
}

export default AnswerSheet;
