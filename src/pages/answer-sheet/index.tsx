import { Collapse, Stack } from '@mui/material'
import React, { useMemo } from 'react'
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

/**
 *
 * todo start之后，end之前，window.unload要加拦截
 */
const AnswerSheet = () => {
  const location: Location<ExamControllerConfig> = useLocation();
  const navigate = useNavigate()
  const [controller, setController] = React.useState<AnswerSheetController|undefined>()

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
      if (controller.questions.length > list.length + 1) {
        setList(list => [...list, SelectQuizCard])
      } else {
        // todo 结束
      }
    }
    // setList(list => [StartCard, ...list])
  }

  const [list, setList] = React.useState<React.FC<CommonCard>[]>([
    StartCard
  ])

  const stackRef = React.useRef<HTMLDivElement>(null)
  const [tY, setTy] = React.useState<number>(0)
  React.useEffect(() => {
    const ro = new ResizeObserver(entries => {
      if (stackRef.current) {
        const children = stackRef.current.children
        setTy(children[children.length - 1].clientHeight / 2)
        console.log('trigger!')
      }
    })
    stackRef.current && ro.observe(stackRef.current)

    return () => {
      stackRef.current && ro.unobserve(stackRef.current)
    }
  }, [])
  // const tY = useMemo(() => {
  //   if (stackRef.current) {
  //     const children = stackRef.current.children
  //     return children[children.length - 1].clientHeight / 2
  //   } else {
  //     return 0
  //   }
  // }, [stackRef])

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
