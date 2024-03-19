import React, { useMemo } from 'react'
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'

const SingleSelect: React.FC<{
  options: { [value: string]: string }
  disabled: boolean
  value?: string
  onChange: (value: string) => void
  hideValueBeforeAnswer?: boolean
}> = ({ options, disabled, value = '', onChange, hideValueBeforeAnswer }) => {
  const [innerValue, setValue] = React.useState(value)

  const parsedOptions = useMemo(() => {
    return Object.keys(options).map((value) => ({
      label: options[value],
      value: value
    }))
  }, [options])
  return <>
    <RadioGroup
      value={innerValue}
      onChange={(event) => {
        setValue(event.target.value)
        onChange(event.target.value)
      }}
    >
      {parsedOptions.map((option) => <FormControlLabel
        disabled={disabled}
        key={option.value}
        control={<Radio/>}
        label={<Typography variant={'body2'} textAlign={'justify'}>{!hideValueBeforeAnswer && `${option.value}. `}{option.label}</Typography>}
        value={option.value} />)}
    </RadioGroup>
  </>
}

export default SingleSelect
