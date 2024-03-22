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
  ListItemText, Stack, useMediaQuery,
  useTheme,
} from '@mui/material'
import { Record } from '@/db/models/record'
import { getScoreColor } from '@/helpers/score-palette'
import dayjs from 'dayjs'
import {
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
  Edit,
  Visibility,
} from '@mui/icons-material'
import { usePagination } from '@/hooks/use-pagination'
import Box from '@mui/material/Box'

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
  const { state, dispatch, current: displayRecords } = usePagination(records)
  console.log(records, displayRecords, state)

  const listRef = React.useRef<HTMLUListElement>(null)
  React.useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (listRef.current) {
        // todo 如何判断
        console.dir((listRef.current.parentNode as HTMLDivElement))
        console.log('scroll', listRef.current.scrollHeight, 'client', listRef.current.clientHeight)
      }
    })

    listRef.current && ro.observe(listRef.current)
    return () => { listRef.current && ro.unobserve(listRef.current) }
  }, [])

  return <CommonPaper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} title={'查看历史'} subtitle={'看看曾经都做过些什么'}>
    <Stack sx={{ flex: 1, overflowY: 'auto' }} flexDirection={'column'} justifyContent={'space-between'}>
      <Box ref={listRef} sx={{ flex: 1, overflow: 'hidden' }} component={'div'}>
        <List component={'ul'} dense={matchXS} disablePadding={matchXS}>
          { displayRecords?.map(record => <>
            <ListItem
              key={record.id}
              disablePadding={matchXS}
              secondaryAction={matchXS ? <>
                <IconButton onClick={() => dispatch({ type: 'go-next' })}><Visibility/></IconButton>
                <IconButton edge={'end'} onClick={() => dispatch({ type: 'set-size', size: 5 })}><Edit/></IconButton>
              </> : <>
                <Button startIcon={<Visibility/>}>查看记录</Button>
                <Button startIcon={<Edit/>}>重做一遍</Button>
              </>}>
              <ListItemAvatar><Avatar sx={{ bgcolor: isLightTheme ? getScoreColor(record.score) : '' }}>{record.score}</Avatar></ListItemAvatar>
              <ListItemText primary={classifyMap.get(record.classifyId)} secondary={dayjs(record.updateDate).format('YYYY-MM-DD HH:mm:ss') + ' - ' + record.type} />
            </ListItem>
            <Divider key={record.id + '-d'} component="li"/>
          </>) }
        </List>
      </Box>
      <Stack flexDirection={'row'}>
        <Button startIcon={<ArrowCircleLeftOutlined/>} fullWidth>上一页</Button>
        <Button endIcon={<ArrowCircleRightOutlined />} fullWidth>下一页</Button>
      </Stack>
    </Stack>
  </CommonPaper>
}

export default RecordList
