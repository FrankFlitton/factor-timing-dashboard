export const snakeToTile = (s) => {
  const string = typeof s === 'string' ? s : ''
  let sentence = string.toLowerCase().split("_")
  if (!!string.length) {
    for (let i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
    }
  }
  return sentence.join(" ");
}
