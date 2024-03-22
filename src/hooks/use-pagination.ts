import React from 'react'

interface State<T> {
  all: T[]
  size: number
  page: number
}

interface ResetDataAction<T> {
  type: 'reset-data',
  data: T[]
}

interface PrevPageAction {
  type: 'go-prev'
}
interface NextPageAction {
  type: 'go-next'
}
interface GoPageAction {
  type: 'go-page',
  page: number
}
interface SetSizeAction {
  type: 'set-size'
  size: number
}

type Actions<T> = ResetDataAction<T> | PrevPageAction | NextPageAction | SetSizeAction | GoPageAction

const getCurrent = <T>(raw: T[], page: number, size: number) => {
  if (page < 0) {
    return raw.slice(0, size)
  } else {
    const maxPage = Math.floor(raw.length / size)
    const p = page < maxPage ? page : maxPage
    return raw.slice(p * size, (p+1) * size)
  }
}

export const usePagination = <T>(data: T[] = [], defaultSize: number = 10) => {
  const [state, dispatch] = React.useReducer((state: State<T>, action: Actions<T>) => {
    switch (action.type) {
      case 'reset-data':
        return {
          all: action.data,
          size: state.size,
          page: 0
        }
      case 'set-size':
        return {
          ...state,
          size: action.size,
          page: 0
        }
      case 'go-next': {
        const maxPage = Math.floor(state.all.length / state.size)
        const page = state.page + 1
        return {
          ...state,
          page: page < maxPage ? page : maxPage
        }
      }
      case 'go-prev': {
        const page = state.page - 1
        return {
          ...state,
          page: page < 0 ? 0 : page
        }
      }
      case 'go-page': {
        const maxPage = Math.floor(state.all.length / state.size)
        return {
          ...state,
          page: action.page < maxPage ? action.page : maxPage
        }
      }

    }
  }, { data, defaultSize }, ({ data, defaultSize }) => {
    return {
      all: data,
      size: defaultSize,
      page: 0
    }
  })
  return {
    state,
    dispatch,
    current: getCurrent(state.all, state.page, state.size)
  }
}
