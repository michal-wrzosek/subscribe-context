import React from 'react';

import { ItemType } from './ItemType';
import { Item } from './Item';

export interface ItemListProps {
  items: ItemType[];
}

export const ItemList: React.FC<ItemListProps> = ({ items }) => {
  console.log(`ItemList rendered`);

  return (
    <div>
      {items.map(item => (
        <Item key={item} item={item} />
      ))}
    </div>
  );
};
