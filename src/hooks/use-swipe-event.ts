import React from 'react'

interface SwipeCallback {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

interface SwipeConfig {
  threshold: number
}

interface Point {
  x: number
  y: number
}

export const useSwipeEvent = (callbacks: SwipeCallback, config: SwipeConfig = { threshold: 50 }) => {
  const startPoint = React.useRef<Point|null>(null)
  const endPoint = React.useRef<Point|null>(null)

  const onTouchStart = (e: React.TouchEvent) => {
    endPoint.current = null
    const touch = e.touches[0]
    startPoint.current = {
      x: touch.clientX,
      y: touch.clientY
    }
  }
  const onTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    endPoint.current = {
      x: touch.clientX,
      y: touch.clientY
    }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startPoint.current && endPoint.current) {
      const diffX = endPoint.current.x - startPoint.current.x
      const diffY = endPoint.current.y - startPoint.current.y
      if (diffX > config.threshold) {
        callbacks.onSwipeRight?.()
      }
      if (diffX < -config.threshold) {
        callbacks.onSwipeLeft?.()
      }
      if (diffY > config.threshold) {
        callbacks.onSwipeDown?.()
      }
      if (diffY < -config.threshold) {
        callbacks.onSwipeUp?.()
      }
    }
  }
  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}
