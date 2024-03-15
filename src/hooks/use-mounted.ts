import React from 'react'

export const useMounted = (callback: Function) => {
  const init = React.useRef(false)
  React.useEffect(() => {
    if (!init.current) {
      init.current = true;
      callback()
    }
  }, [])
}
