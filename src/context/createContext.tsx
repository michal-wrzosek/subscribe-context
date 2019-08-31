import React from 'react';

import { Subject, Subscriber } from '../util/Subject';

export const createContext = <T extends any>({ initialValue }: { initialValue: T }) => {
  const subject = new Subject(initialValue);
  const initalContextValue = { subject };
  const Context = React.createContext(initalContextValue);

  const Provider: React.FC = ({ children }) => (
    <Context.Provider value={initalContextValue}>{children}</Context.Provider>
  );

  const useInitialValue = () => {
    const { subject } = React.useContext(Context);
    return subject.getValue();
  };

  const useSubscription = (subscriptionFunc: Subscriber<T>) => {
    const { subject } = React.useContext(Context);

    React.useEffect(() => {
      const subscription = subject.subscribe(subscriptionFunc);

      return () => subscription.unsubscribe();
    });
  };

  const useValue = () => {
    const { subject } = React.useContext(Context);
    const initialValue = subject.getValue();
    const [value, setValue] = React.useState(initialValue);

    React.useEffect(() => {
      const subscription = subject.subscribe(newValue => setValue(newValue));

      return () => subscription.unsubscribe();
    });

    return value;
  };

  const useSetValue = () => {
    const { subject } = React.useContext(Context);
    return subject.next;
  };

  const useValueWithSubscription = (shouldRerenderFunc: (newValue: T, prevValue: T) => boolean) => {
    const { subject } = React.useContext(Context);
    const initialValue = subject.getValue();
    const [value, setValue] = React.useState(initialValue);
    const prevValue = React.useRef(initialValue);

    React.useEffect(() => {
      const subscription = subject.subscribe(newValue => {
        const shouldRerender = shouldRerenderFunc(newValue, prevValue.current);
        prevValue.current = newValue;

        if (shouldRerender) {
          setValue(newValue);
        }
      });

      return () => subscription.unsubscribe();
    });

    return value;
  };

  return { Provider, useInitialValue, useSubscription, useValue, useSetValue, useValueWithSubscription };
};
