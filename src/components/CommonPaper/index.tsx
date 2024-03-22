import { Divider, Paper, SxProps, Theme, Typography } from '@mui/material'
import React from 'react'

const CommonPaper: React.FC<{
  sx?: SxProps<Theme>
  title: string
  subtitle?: string
  children?: React.ReactNode
  ref?: React.ForwardedRef<HTMLDivElement>
}> = React.forwardRef(({ title, subtitle, children, sx = {} }, ref: React.ForwardedRef<HTMLDivElement>) => {
  return <Paper ref={ref} component={'div'} sx={{ p: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }, minWidth: 'sm', ...sx }}>
    <Typography variant={'h5'}>{title}</Typography>
    {subtitle && <Typography variant={'body2'} color={'text.secondary'}>{subtitle}</Typography>}
    <Divider sx={{ marginTop: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }, marginBottom: { xs: 2, sm: 5 } }}/>
    {children}
  </Paper>
})

export default CommonPaper
