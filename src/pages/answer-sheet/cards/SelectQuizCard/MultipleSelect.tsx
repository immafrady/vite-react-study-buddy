import React, { useMemo } from 'react'
import { Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from '@mui/material'

const MultipleSelect: React.FC<{
  options: { [value: string]: string }
  value?: string
  onChange: (value: string) => void
}> = ({ options, value = '', onChange }) => {
  const [state, setState] = React.useState<{ [value: string]: boolean }>(
    Object.keys(options).reduce((acc, key) => ({ ...acc, [key]: value.includes(key) }), {})
  )

  const parsedOptions = useMemo(() => {
    return Object.keys(options).map(value => ({
      label: options[value],
      value: value,
      isChecked: state[value],
    }))
  }, [options, value])

  return <>
    <FormGroup>
      {parsedOptions.map(option => <FormControlLabel
        key={option.value}
        control={
          <Checkbox
            checked={state[option.value]}
            name={option.value}
            onChange={(event) => {
              const result = {
                ...state,
                [event.target.name]: event.target.checked,
              }
              setState(result)
              onChange(Object.entries(result).map(([value, checked]) => checked ? value : '').join(''))
            }} />
        }
        label={<Typography variant={'body2'} textAlign={'justify'}>{`${option.value}. `}{option.label}</Typography>}
      />)}
    </FormGroup>
  </>
}

export default MultipleSelect
