import React from "react";
import globalHook from "use-global-hook";

const initialState = {
  counter: 0
};

const actions = {
  addToCounter: (store, amount) => {
    const newCounterValue = store.state.counter + amount;
    store.setState({ counter: newCounterValue });
  }
};

const useGlobal = globalHook(React, initialState, actions);

const App = () => {
  const [globalState, globalActions] = useGlobal();
  return (
    <div>
      <p>
        counter:
        {globalState.counter}
      </p>
      <button type="button" onClick={() => globalActions.addToCounter(1)}>
        +1 to global
      </button>
    </div>
  );
};

export default App;
