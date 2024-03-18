import {
  Collapse,
  Stack,
} from '@mui/material'
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
    addItem()
  }

  const [list, setList] = React.useState<React.FC<CommonCard>[]>([
    StartCard
  ])


  const addItem = () => {
    setList(list => [StartCard, ...list])
  }
  return <AnswerSheetProvider value={controller}>
    <Box sx={{ position: 'relative', height: '100%', overflowY: 'visible', overflowX: 'visible' }}>
      <Stack spacing={2} justifyContent={'flex-end'} sx={{
        position: 'absolute',
        width: '100%',
        mb: '40vh',
        bottom: 0,
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
              elevation: 5,
              inactive: idx !== list.length - 1,
              onNext,
            }) }
          </Collapse>) }
        </TransitionGroup>
      </Stack>
    </Box>
  </AnswerSheetProvider>
}

export default AnswerSheet;
