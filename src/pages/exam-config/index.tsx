import { Location, useLocation, useNavigate } from 'react-router-dom'
import {
  Autocomplete,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { ExamConfigState } from '@/pages/exam-config/types'
import React from 'react'
import { useDatabase } from '@/stores/use-database'
import { useLiveQuery } from 'dexie-react-hooks'
import Box from '@mui/material/Box'
import { QuestionType } from '@/db/models/question/types'
import { RouterName } from '@/router/types'
import { ExamServiceConfig } from '@/services/exam-service'
import CommonPaper from '@/components/CommonPaper'

const ExamConfig = () => {
  const navigate = useNavigate()
  const location: Location<ExamConfigState> = useLocation()
  const { db} = useDatabase()
  const classifies = useLiveQuery(() => {
    return db.classifies.toArray()
  })
  const [form, setForm] = React.useState<{ classifyId: string; types: QuestionType[]; count: string }>({
    classifyId: '',
    types: [],
    count: '',
  })
  const [typeOptions, setTypeOptions] = React.useState<QuestionType[]>([])

  const onCountChange = (event: any, value: any) => setForm({ ...form, count: value as string })

  return <CommonPaper title={location.state?.modeName} subtitle={location.state?.modeExplain}>
    <Container maxWidth={'sm'}>
      <Stack spacing={2}>
        <FormControl fullWidth>
          <InputLabel id="classify-id-select-label">请选择题目类别</InputLabel>
          <Select<number|string>
            labelId="classify-id-select-label"
            value={form.classifyId}
            label={'请选择题目类别'}
            onChange={event => {
              const classifyId = event.target.value as number
              setForm({ ...form, classifyId: classifyId + '', types: [] })
              const target = classifies?.find(item => item.id === classifyId)
              setTypeOptions(target?.questionTypes || [])
            }}
          >
            { classifies?.map((item, idx) => <MenuItem key={idx} value={item.id} dense>{item.name}</MenuItem>) }
          </Select>
        </FormControl>

        { form.classifyId && <Box>
          <InputLabel>请选择答题类型</InputLabel>
          <FormGroup>
            { typeOptions?.map((item, idx) => <FormControlLabel
              key={idx}
              control={
                <Checkbox
                  checked={form.types.includes(item)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setForm({ ...form, types: [...form.types, item]})
                    } else {
                      setForm({ ...form, types: form.types.filter(type => type !== item)})
                    }
                  }}
                />}
              label={item}/>
            ) }
          </FormGroup>
        </Box> }

        <Autocomplete
          value={form.count}
          options={['10', '25', '50', '100']}
          freeSolo
          onChange={onCountChange}
          onInputChange={onCountChange}
          renderInput={(params) => <TextField {...params} type={'number'} label={'请选择做题数量'} />}
        />

        <Button disabled={!(form.classifyId && form.types.length && form.count)} onClick={() => {
          navigate(RouterName.AnswerSheet, {
            state: {
              classifyId: +form.classifyId,
              types: form.types,
              count: +form.count,
              type: location.state?.type
            } as ExamServiceConfig
          })
        }}>下一步</Button>
      </Stack>
    </Container>
  </CommonPaper>
}

export default ExamConfig
