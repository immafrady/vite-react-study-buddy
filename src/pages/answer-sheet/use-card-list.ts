import React from 'react'
import { CommonCard } from '@/pages/answer-sheet/cards/types'

interface Add {
  type: 'add'
  card: React.FC<CommonCard>
}
interface MoveUp {
  type: 'move-up',
}
interface MoveDown {
  type: 'move-down'
}
interface Init {
  type: 'init'
  cards: React.FC<CommonCard>[]
  page: number
}

type Actions = Add | MoveUp | MoveDown | Init
type State = {
  cards: React.FC<CommonCard>[]
  page: number
}
export const useCardList = (cards: React.FC<CommonCard>[]): [State, React.Dispatch<Actions>] => {
  const [state, dispatch] = React.useReducer((state: State, action: Actions) => {
    switch (action.type) {
      case 'add':
        return {
          cards: [...state.cards, action.card],
          page: state.page + 1
        }
      case 'init':
        return {
          cards: [...action.cards],
          page: action.page
        }
      case 'move-up':
        return {
          cards: state.cards,
          page: state.page < state.cards.length - 1 ? state.page + 1 : state.page
        }
      case 'move-down':
        return {
          cards: state.cards,
          page: state.page >= 0 ? state.page - 1 : state.page
        }
    }
  }, cards, cards => {
    return {
      cards: cards,
      page: 0
    }
  })

  return [state, dispatch]
}
