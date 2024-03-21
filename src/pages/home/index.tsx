import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import { RouterName } from '@/router/types'
import { ExamConfigState } from '@/pages/exam-config/types'
import { ExamType } from '@/services/exam-service/types'
import { resourceBasename } from '@/helpers/project'
import { ArrowCircleRightOutlined } from '@mui/icons-material'
import React from 'react'

const Home = () => {
  const navigate = useNavigate()
  return <Grid container spacing={2}>
      { [{
        title: '开始做题',
        desc: '随便刷刷咯',
        action: () => {
          navigate(RouterName.ExamConfig, {
            state: {
              modeName: '普通模式',
              modeExplain: '选择参数后开始刷题',
              type: ExamType.Normal,
            } as ExamConfigState
          })
        },
        background: {
          x: 85,
          y: 130,
        }
      }, {
        title: '考试模式',
        desc: '来一场痛快的决斗吧！',
        action: () => {
          navigate(RouterName.ExamConfig, {
            state: {
              modeName: '考试模式',
              modeExplain: '选择参数后开始刷题，一口气做完后再看答案噢～',
              type: ExamType.Exam,
            }
          })
        },
        background: {
          x: 380,
          y: 150,
        }
      }, {
        title: '复习模式',
        desc: '查漏补缺',
        action: () => {

        },
        background: {
          x: 120,
          y: 480,
        }
      }, {
        title: '历史记录',
        desc: '看看曾经都做过些什么',
        action: () => {
          navigate(RouterName.RecordList)
        },
        background: {
          x: 750,
          y: 370,
        }
      }
      ].map((item, idx) => <Grid key={idx} item xs={24} md={6} sm={12}>
          <Card
            elevation={3}
            sx={{ display: 'flex' }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <CardHeader title={item.title}/>
              <CardContent><Typography variant={'body2'}>{item.desc}</Typography></CardContent>
              <CardActions>
                <IconButton color={'primary'} onClick={() => item.action()}><ArrowCircleRightOutlined/></IconButton>
              </CardActions>
            </Box>
            <CardMedia sx={{ width: 170, minWidth: 170, height: 170,  background: `url('${resourceBasename}/images/cats.jpeg') -${item.background.x}px -${item.background.y}px` }} component={'div'} />
          </Card>
      </Grid>) }
  </Grid>;
};

export default Home;
