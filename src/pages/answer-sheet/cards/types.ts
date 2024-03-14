import { CardProps } from '@mui/material/Card/Card'

export interface CommonCard extends CardProps {
  inactive?: boolean
  onNext: () => void
}
