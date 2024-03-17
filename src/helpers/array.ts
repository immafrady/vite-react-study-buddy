/**
 * 数组重新打乱
 * @param array
 */
export const shuffle = <T>(array: T[]) => {
  const shuffledArray = array.slice() // Create a shallow copy of the original array

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1)) // Generate a random index between 0 and i
    ;[shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]]; // Swap elements
  }

  return shuffledArray
}

/**
 * 数组随机取值
 * @param array
 * @param count
 */
export const pick = <T>(array: T[], count: number) => {
  if (count > array.length) return array
  const copiedArray = array.slice()
  const shuffledArray = shuffle(copiedArray)
  return shuffledArray.slice(0, count)
}
