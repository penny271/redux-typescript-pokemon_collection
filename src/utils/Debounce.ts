// src/utils/Debounce.ts
export const debounce = (fn: Function, timeout: number) => {
  // closure
  let timer: ReturnType<typeof setTimeout>;
  // 高位関数 - high order function
  //* e.target.value は ...args に入る
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // args 例: search value = e.target.value
      fn.apply(this, args);
    }, timeout);
  }
}

