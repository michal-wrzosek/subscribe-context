export type Subscription = {
  unsubscribe: () => void;
};

export type NextValueFunc<T> = (prevValue: T) => T;
export type NextValueAsyncFunc<T> = (prevValue: T) => Promise<T>;
export type Subscriber<T> = (value: T) => any;

export class Subject<T> {
  counter = 0;
  initialValue: T = null as any;
  value: T = null as any;
  subscribers: { [key: string]: Subscriber<T> } = {};

  constructor(value: T) {
    this.initialValue = value;
    this.value = value;
  }

  next = (nextValueOrFunc: T | NextValueFunc<T> | NextValueAsyncFunc<T>) => {
    if (typeof nextValueOrFunc === 'function') {
      const functionResult = (nextValueOrFunc as NextValueFunc<T>)(this.value);

      if (functionResult instanceof Promise) {
        functionResult
          .then(nextValue => {
            this.value = nextValue;
            Object.values(this.subscribers).forEach((subscriber: Subscriber<T>) => subscriber(nextValue));
          })
          .catch(() => {});
      } else {
        const nextValue = functionResult;
        this.value = nextValue;
        Object.values(this.subscribers).forEach((subscriber: Subscriber<T>) => subscriber(nextValue));
      }
    } else {
      const nextValue = nextValueOrFunc;
      this.value = nextValue;
      Object.values(this.subscribers).forEach((subscriber: Subscriber<T>) => subscriber(nextValue));
    }
  };

  subscribe = (fn: Subscriber<T>): Subscription => {
    const index = `${this.counter++}`;
    this.subscribers[index] = fn;
    return {
      unsubscribe: () => {
        delete this.subscribers[index];
      },
    };
  };

  destroy = () => {
    this.value = this.initialValue;
    this.subscribers = {};
  };

  getValue = () => this.value;
}
