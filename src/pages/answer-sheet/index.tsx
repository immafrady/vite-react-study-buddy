import { Button, Card, CardActions, CardContent, CardHeader, Container, Slide, Stack, Typography } from '@mui/material'
import React from 'react'
import { useLocation, Location } from 'react-router-dom'
import { ExamHolder, IExamHolderConfig } from '@/services/exam-holder'
import { TransitionGroup } from 'react-transition-group'

const AnswerSheet = () => {
  const location: Location<IExamHolderConfig> = useLocation();
  const examHolder = React.useMemo(() => {
    console.log('trigger useMemo')
    return new ExamHolder(location.state)
  }, [location.state]);
  const [list, setList] = React.useState<number[]>([1]);

  return <Stack component={'section'} spacing={2} sx={{
    width: '100%',
    bottom: '40%',
    position: 'absolute',
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
      { list.map((item, idx) => <Slide direction={'up'} key={item}>
        <Card elevation={2} sx={{ overflow: 'visible' }}>
          <CardHeader title={item}/>
          <CardContent>{ !idx && 'current'}</CardContent>
          <CardActions><Button onClick={() => {
            setList([...list, list.length+1])
          }}>+1</Button></CardActions>
        </Card>
      </Slide>) }
    </TransitionGroup>
  </Stack>
};

export default AnswerSheet;
