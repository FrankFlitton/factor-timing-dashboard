// Conversion of an integer to 32bits
export const hash = (s) => {
  let hash = 0
  if (s.length === 0) {
      return hash
  }
  for (var i = 0; i < s.length; i++) {
      let char = s.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
  }
  return hash
}