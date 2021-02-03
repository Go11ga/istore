/**
 * * Чанки переменной длинны
 * @param { array } array - массив
 * @param { number } chunkSizeMin - размер первого чанка
 * @param { number } chunkSizeMax - размер второго чанка
 */
export function mixChunck (array, chunkSizeMin, chunkSizeMax) {
  const a = []
  function next (index) {
    return index % 2 === 0 ? chunkSizeMin : chunkSizeMax
  }
  for ( let i = 0, j = 0; i < array.length; i += next(j), j++ ) {
    a.push(array.slice(i, i + next(j)))
  }
  return a
}