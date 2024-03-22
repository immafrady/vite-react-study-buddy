const palette = [
  '#FF0000',
  '#F11700',
  '#E32E00',
  '#D54600',
  '#C75D00',
  '#B97400',
  '#AC8B00',
  '#9EA200',
  '#90B900',
  '#82D100',
  '#74E800',
  '#66FF00'
]

export const getScoreColor = (score: number) => {
  let result = ''
  for (let i = 0; i < palette.length; i++) {
    result = palette[i]
    if (score <= i*10) {
      break
    }
  }
  return result
}
