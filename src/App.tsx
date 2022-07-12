/* eslint-disable react/no-unused-state */
import React from 'react';
import './App.scss';

const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const createMessage = (selectArray: string[]): string => {
  if (selectArray.length === 0) {
    return 'No goods selected';
  }

  if (selectArray.length === 1) {
    return `${selectArray[0]} is selected`;
  }

  return `${selectArray.slice(0, -1).join(',')} and ${selectArray.slice(-1)} are selected`;
};

type State = {
  selectedGoods: string[],
  // addOrDelete: boolean,
};

class App extends React.Component<{}, State> {
  state = {
    selectedGoods: ['Jam'],
  };

  addGood = (good: string) => {
    this.setState(prevState => ({
      selectedGoods: [...prevState.selectedGoods, good],
    }));
  };

  removeGood = (good: string) => {
    this.setState((prevState) => ({
      selectedGoods: prevState.selectedGoods
        .filter((prevGood) => (prevGood !== good)),
    }));
  };

  actionButton = (isSelected: boolean, good: string) => {
    return isSelected
      ? this.removeGood(good)
      : this.addGood(good);
  };

  clear = () => {
    this.setState({ selectedGoods: [] });
  };

  render() {
    const { selectedGoods } = this.state;

    return (
      <div className="App">
        <h1
          className="App__title"
        >
          {createMessage(selectedGoods)}
        </h1>

        <ul className="App__names">
          {goodsFromServer.map((good) => {
            const isSelected = selectedGoods.includes(good);
            const textForButton = isSelected ? 'Remove' : 'Select';

            return (
              <div className="App__card">
                <li className="App__card-name" key={good}>
                  {good}
                </li>

                <div className="App__container-button">
                  <button
                    className="App__button"
                    onClick={() => this.actionButton(isSelected, good)}
                    type="button"
                  >
                    {textForButton}
                  </button>
                </div>
              </div>
            );
          })}
        </ul>

        <button
          onClick={this.clear}
          type="button"
          className="App__clear-button"
        >
          Clear
        </button>
      </div>
    );
  }
}

export default App;