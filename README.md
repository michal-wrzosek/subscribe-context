# subscribe-context

_This is a proof of concept_

_The Subject pattern used in this package comes from idea of my friend [Enes Tüfekçi](https://github.com/enesTufekci)_.

---

**To install run:**

```
npm install subscribe-context
```

This package comes with TypeScript support out of the box so you don't need to install anything else.

**Peer dependencies:**

```
"react": "^16.8.6",
"react-dom": "^16.8.6"
```

---

## How to use - selected item example

1. Create a new context

**src/context/SelectedItemContext.ts**

```typescript
import { createContext } from 'subscribe-context';

export type SelectedItemType = string | undefined;

export const SelectedItemContext = createContext({
  initialValue: undefined as SelectedItemType,
});
```

2. Place a Provider somewhere above the components that will be using this shared state.

**src/App.tsx**

```typescript
import React, { Component } from 'react';

import { SelectedItemContext } from './context/SelectedItemContext';
import { ClearSelectionBtn } from './ClearSelectionBtn';
import { SelectedItem } from './SelectedItem';
import { ItemList } from './ItemList';

const items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

class App extends Component {
  render() {
    return (
      <SelectedItemContext.Provider>
        <ClearSelectionBtn />
        <SelectedItem />
        <ItemList items={items} />
      </SelectedItemContext.Provider>
    );
  }
}

export default App;
```

3. Use relevant hooks based on your component needs.

**src/SelectedItem.tsx** - will re render on every value change

```typescript
import React from 'react';

import { SelectedItemContext } from './context/SelectedItemContext';

export const SelectedItem = () => {
  const value = SelectedItemContext.useValue();

  if (typeof value !== 'undefined') return <div>Selected item: {value}</div>;

  return <div>No item is selected</div>;
};
```

**src/ClearSelectionBtn.tsx** - it just mutates the state and will not rerender on value changes

```typescript
import React from 'react';

import { SelectedItemContext } from './context/SelectedItemContext';

export const ClearSelectionBtn = () => {
  const setValue = SelectedItemContext.useSetValue();
  const handleClick = () =>
    setValue(
      prevValue =>
        new Promise((res, rej) => {
          if (prevValue === undefined) return rej();
          return res(undefined);
        }),
    );

  return <div onClick={handleClick}>Clear selection</div>;
};
```

**src/Item.tsx** - this is an example where we can decide when to rerender

```typescript
import React from 'react';

import { ItemType } from './ItemType';
import { SelectedItemContext } from './context/SelectedItemContext';

export interface ItemProps {
  item: ItemType;
}

export const Item: React.FC<ItemProps> = ({ item }) => {
  const selectedItem = SelectedItemContext.useValueWithSubscription((newValue, prevValue) => {
    if (prevValue === item && newValue !== item) return true;
    if (prevValue !== item && newValue === item) return true;
    return false;
  });

  const setValue = SelectedItemContext.useSetValue();
  const handleClick = () => setValue(prevItem => (prevItem === item ? undefined : item));

  const isSelected = selectedItem === item;

  return (
    <div style={{ backgroundColor: isSelected ? 'red' : 'transparent' }} onClick={handleClick}>
      Item: {item}
    </div>
  );
};
```

You can check out example CRA in this repo [./example](./example) and a build demo [here](https://michal-wrzosek.github.io/subscribe-context/)

## Hooks

### useValue()

This hook returns the value and will cause your component to be rerendered everytime value is mutated.

```typescript
const value = YourContext.useValue();
```

### useValueWithSubscription(shouldRerenderFunc)

This hook returns a state and lets you pass a callback function that can decide if the value should be updated (that way you can opt-out from rerendering you component).

```typescript
const value = YourContext.useValueWithSubscription((nextValue, prevValue) => nextValue !== prevValue);
```

### useSetValue()

This hook returns a function that will let you mutate the state. This hook will not cause your component to rerender on state changes.

```typescript
const setValue = YourContext.useSetValue();

// You can just provide a pure value
setState('Just a value');

// You can provide a function that will receive a previous state
// and the new state will be whatever the function returns.
setState(prevValue => !prevValue);

// If you need async features or you want to optionally opt-out from
// mutating the state you can use a function returning a Promise.
// If you reject the Promise the state will not be mutated.
// Whatever value will be resolved will be used as a new state.
setState(
  prevValue =>
    new Promise((nextValue, doNotMutateState) => {
      if (prevValue === 'A') return doNotMutateState();
      return nextValue('A');
    }),
);
```

### useInitialValue()

This hook will return initial value and will not update the value later on.

```typescript
const initialValue = YourContext.useInitialValue();
```

### useSubscription(subscriptionFunc)

This hook allows you to pass a callback function that will be called everytime the value is changed.

```typescript
YourContext.useSubscription(nextValue => console.log('nextValue', nextValue));
```

---

## State managment with React Hooks, Context API and Observables

### How to prevent unnecessary re-renders

Some time ago, my friend, [Enes Tüfekçi](https://github.com/enesTufekci), showed me a cool way to solve the issues with Context API mutations causing your components to be rerendered everytime any value in your context changes. I did not found anyone else showing this solution, so here am I, sharing this concept with you.

Let's say you have an app where you can select one Item at a time and you want to keep this state in context to be globally available for different components.

The ususal approach would be to store the state inside the context. So you could for example keep in context the id of currently selected Item and a functions to mutate the state. This approach causes lots of trouble with unnecessary rerenders of your components consuming your context.

The core concept here is to put in your context only a Subject - an observable, that you can subscribe to and you can mutate its value. That way the value of your context never changes. You can, though, subscirbe to Subject and react to its state changes. Then on Subject value changes you can mutate your local components state. That will allow you to control when you want to rerender your component.

This concept is the foundation of this package.

---

This repository was bootstrapped with [react-component-lib](https://github.com/michal-wrzosek/react-component-lib)
