import React from 'react';

import { ItemType } from './ItemType';
import { SelectedItemContext } from './context/SelectedItemContext';

export interface ItemProps {
  item: ItemType;
}

export const Item: React.FC<ItemProps> = ({ item }) => {
  console.log(`Item ${item} rendered`);

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
