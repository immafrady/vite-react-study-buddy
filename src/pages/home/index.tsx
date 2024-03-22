import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader, useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { RouterName } from '@/router/types'
import { ExamConfigState } from '@/pages/exam-config/types'
import { ExamType } from '@/services/exam-service/types'
import {
  EmojiEmotions,
  Favorite,
  HistoryEdu,
  RateReview,
  Settings,
  SportsKabaddi,
} from '@mui/icons-material'
import React from 'react'
import CommonPaper from '@/components/CommonPaper'
import { blueGrey, deepPurple, green, grey, orange, red } from '@mui/material/colors'
import Box from '@mui/material/Box'

const Home = () => {
  const theme = useTheme()
  const isLightTheme = React.useMemo(() => theme.palette.mode === 'light', [theme.palette.mode])
  const navigate = useNavigate()
  const modeList = [{
    title: '开始做题',
    desc: '随便刷刷咯',
    icon: EmojiEmotions,
    color: deepPurple[400],
    action: () => {
      navigate(RouterName.ExamConfig, {
        state: {
          modeName: '普通模式',
          modeExplain: '选择参数后开始刷题',
          type: ExamType.Normal,
        } as ExamConfigState
      })
    }
  }, {
    title: '考试模式',
    desc: '来一场痛快的决斗吧！',
    icon: SportsKabaddi,
    color: red[400],
    action: () => {
      navigate(RouterName.ExamConfig, {
        state: {
          modeName: '考试模式',
          modeExplain: '选择参数后开始刷题，一口气做完后再看答案噢～',
          type: ExamType.Exam,
        } as ExamConfigState
      })
    }
  }, {
    title: '复习模式',
    desc: '查漏补缺',
    icon: RateReview,
    color: green[400],
    action: () => {

    }
  }, {
    title: '心标模式',
    desc: '做自己最爱的题目',
    icon: Favorite,
    color: orange[400],
    action: () => {

    }
  }]

  const otherList = [{
    title: '查看历史',
    icon: HistoryEdu,
    color: blueGrey[500],
    action: () => {
      navigate(RouterName.RecordList)
    }
  }, {
    title: '设置',
    icon: Settings,
    color: grey[400],
    action: () => {

    }
  }]


  return <CommonPaper sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} title={'欢迎访问学习伙伴'} subtitle={'陪你做做题～'}>
    <Box sx={{ overflowY: 'auto', flex: 1 }}>
      <List disablePadding>
        <ListSubheader disableSticky>请选择你的模式</ListSubheader>
        { modeList.map((item, idx) => <>
          <ListItem key={idx} disableGutters>
            <ListItemButton onClick={item.action}>
              <ListItemAvatar><Avatar sx={{ bgcolor: isLightTheme ? item.color : '' }}>
                { React.createElement(item.icon) }
              </Avatar></ListItemAvatar>
              <ListItemText primary={item.title} secondary={item.desc} />
            </ListItemButton>
          </ListItem>
          { idx !== modeList.length - 1 && <Divider variant={'middle'} component="li" /> }
        </>) }
        <ListSubheader disableSticky>其他</ListSubheader>
        { otherList.map((item, idx) => <>
          <ListItem disableGutters>
            <ListItemButton onClick={item.action}>
              <ListItemAvatar><Avatar sx={{ bgcolor: isLightTheme ? item.color : '' }}>
                { React.createElement(item.icon) }
              </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.title}></ListItemText>
            </ListItemButton>
          </ListItem>
          { idx !== otherList.length - 1 && <Divider variant={'middle'} component="li" /> }
        </>) }
      </List>
    </Box>
  </CommonPaper>
}

export default Home;
