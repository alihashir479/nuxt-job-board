export const debounce = <T extends (...args: any[]) => void>(fn: T, delay = 500) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
