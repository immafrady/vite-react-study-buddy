import { CardProps } from '@mui/material/Card/Card'

export interface CommonCard extends CardProps {
  idx: number
  inactive?: boolean
  onNext: () => void
}

export enum CardType {
  StartCard,
  SelectQuizCard,
  ResultCard
}

