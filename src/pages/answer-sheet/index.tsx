import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useLocation, Location } from 'react-router-dom'
import { IExamHolderConfig } from '@/services/exam-holder'

const AnswerSheet = () => {
  const location: Location<IExamHolderConfig> = useLocation();

  return <Card>
    <CardContent>
      <Typography variant={'h6'}>{location.state?.classifyId}</Typography>
      <Typography variant={'h6'}>{location.state?.types.join(', ')}</Typography>
      <Typography variant={'h6'}>{location.state?.count}</Typography>
    </CardContent>
  </Card>;
};

export default AnswerSheet;
