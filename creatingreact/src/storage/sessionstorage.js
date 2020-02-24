import React from "react";
import createPersistedState from "@plq/use-persisted-state";

const [usePersistedState] = createPersistedState(
  "example",
  window.sessionStorage
);

export default function App() {
  const [count, setCount] = usePersistedState("count", 0);
  const increment = () => setCount(prevCount => prevCount + 1);

  return (
    <div>
      {count}
      <button onClick={increment}>+</button>
    </div>
  );
}
