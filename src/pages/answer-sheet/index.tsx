import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Container,
  Slide,
  Stack,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation, Location, useNavigate } from 'react-router-dom'
import { ExamHolder, IExamHolderConfig } from '@/services/exam-holder'
import { TransitionGroup } from 'react-transition-group'
import StartCard from '@/pages/answer-sheet/cards/StartCard'
import { CommonCard } from '@/pages/answer-sheet/cards/types'
import Box from '@mui/material/Box'
import { RouterName } from '@/router/types'

const AnswerSheet = () => {
  const location: Location<IExamHolderConfig> = useLocation();
  const navigate = useNavigate()

  const examHolder = React.useMemo(() => {
    if (location.state) {
      return new ExamHolder(location.state)
    } else {
      return undefined
    }
  }, [location.state]);
  useEffect(() => {
    if (!examHolder) {
      navigate(RouterName.Home)
    }
  }, [examHolder])

  const [list, setList] = React.useState<React.ReactElement<CommonCard>[]>([
    <StartCard onNext={() => addItem()}/>
  ])


  const addItem = () => {
    setList(list => [<StartCard onNext={() => addItem()}/>, ...list])
  }

  return <Box sx={{ position: 'relative', height: '100%', overflowY: 'visible', overflowX: 'visible' }}>
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
          { React.cloneElement(component, {
            key: idx,
            elevation: 5,
            inactive: idx !== list.length - 1
          }) }
        </Collapse>) }
      </TransitionGroup>
    </Stack>
  </Box>
};

export default AnswerSheet;
