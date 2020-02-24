import React from "react";
import createPersistedState from "@plq/use-persisted-state";

const [usePersistedState, clear] = createPersistedState("example");

export default function App() {
  const [count, setCount] = usePersistedState("count", 0);
  const increment = () => setCount(prevCount => prevCount + 1);

  return (
    <div>
      {count}
      <button onClick={increment}>+</button>
      <button onClick={clear}>Clear</button>
    </div>
  );
}
