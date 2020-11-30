/**
 * * Range
 * @param start - начало отсчёта
 * @param stop - конец отсчёта
 * @param step - шаг
 */
export function range (start, stop, step = 1) {
  return Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)
}
