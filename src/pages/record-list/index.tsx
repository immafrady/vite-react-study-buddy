import React from 'react'
import CommonPaper from '@/components/CommonPaper'
import { useLiveQuery } from 'dexie-react-hooks'
import { useDatabase } from '@/stores/use-database'
import {
  Avatar,
  Button,
  Divider, IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText, useMediaQuery,
  useTheme,
} from '@mui/material'
import Box from '@mui/material/Box'
import { Record } from '@/db/models/record'
import { getScoreColor } from '@/helpers/score-palette'
import dayjs from 'dayjs'
import { Edit, Visibility } from '@mui/icons-material'

const RecordList = () => {
  const theme = useTheme()
  const isLightTheme = React.useMemo(() => theme.palette.mode === 'light', [theme.palette.mode])
  const db = useDatabase.getState().db
  const records = useLiveQuery(() => db.records.toCollection().sortBy('updateDate')) as Record[]|undefined
  const classifies = useLiveQuery(() => db.classifies.toArray())
  const classifyMap = React.useMemo(() => {
    const map = new Map()
    if (Array.isArray(classifies)) {
      classifies.forEach((item) => {
        map.set(item.id, item.name)
      })
    }
    return map
  }, [classifies])

  const matchXS = useMediaQuery(theme.breakpoints.down('sm'))

  return <CommonPaper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} title={'查看历史'} subtitle={'看看曾经都做过些什么'}>
    <Box sx={{ overflowY: 'auto' }}>
      <List dense={matchXS}>
        { records?.map(record => <>
          <ListItem
            key={record.id}
            disablePadding={matchXS}
            secondaryAction={matchXS ? <>
              <IconButton><Visibility/></IconButton>
              <IconButton edge={'end'}><Edit/></IconButton>
            </> : <>
              <Button startIcon={<Visibility/>}>查看记录</Button>
              <Button startIcon={<Edit/>}>重做一遍</Button>
            </>}>
            <ListItemAvatar><Avatar sx={{ bgcolor: isLightTheme ? getScoreColor(record.score) : '' }}>{record.score}</Avatar></ListItemAvatar>
            <ListItemText primary={classifyMap.get(record.classifyId)} secondary={dayjs(record.updateDate).format('YYYY-MM-DD HH:mm:ss') + ' - ' + record.type} />
          </ListItem>
          <Divider />
        </>) }
      </List>
    </Box>
  </CommonPaper>
}

export default RecordList
