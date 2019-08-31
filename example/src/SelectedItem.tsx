import React from 'react';

import { SelectedItemContext } from './context/SelectedItemContext';

export const SelectedItem = () => {
  console.log(`SelectedItem rendered`);

  const value = SelectedItemContext.useValue();

  if (typeof value !== 'undefined') return <div>Selected item: {value}</div>;

  return <div>No item is selected</div>;
};
