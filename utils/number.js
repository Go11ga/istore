/**
 * * Range
 * @param { number } start - начало отсчёта
 * @param { number } stop - конец отсчёта
 * @param { number } step - шаг
 */
export function range (start, stop, step = 1) {
  return Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)
}
