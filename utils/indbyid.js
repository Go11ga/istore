/**
 * * Индекс массива по id
 * @param array - массив где искать
 * @param id - id которое ищем
 */
export function indById (array, id) {
  return array.findIndex(el => parseInt(el.id) === id)
}