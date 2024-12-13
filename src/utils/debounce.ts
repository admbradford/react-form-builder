export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
    let timer: any;
    return function(this: any, ...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    } as T;
  }