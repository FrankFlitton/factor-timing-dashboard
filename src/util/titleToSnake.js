export const titleToSnake = (s) => {
  const string = typeof s === 'string' ? s : ''
  const sentence = string.toLowerCase().split(" ")
  return sentence.join("_")
}
