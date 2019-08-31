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
