import React from 'react'
import CommonPaper from '@/components/CommonPaper'
import { useLiveQuery } from 'dexie-react-hooks'
import { useDatabase } from '@/stores/use-database'
import { Divider, List, ListItem, ListItemButton } from '@mui/material'
import Box from '@mui/material/Box'

const RecordList = () => {
  const db = useDatabase.getState().db
  const records = useLiveQuery(() => db.records.toCollection().sortBy('updateDate'))

  return <CommonPaper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} title={'查看历史'} subtitle={'看看曾经都做过些什么'}>
    <Box sx={{ overflowY: 'auto' }}>
      <List>
        { records?.map(record => <>
          <ListItem key={record.id} disablePadding>
            <ListItemButton>
              { record.updateDate.toString() }
              { record.updateDate.toString() }
              { record.updateDate.toString() }
              { record.updateDate.toString() }
            </ListItemButton>
          </ListItem>
          <Divider />
        </>) }
      </List>
    </Box>
  </CommonPaper>
}

export default RecordList
