import React from 'react';

import { SelectedItemContext } from './context/SelectedItemContext';

export const ClearSelectionBtn = () => {
  console.log(`ClearSelectionBtn rendered`);

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
