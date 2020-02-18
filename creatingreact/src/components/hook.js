import React, { useState } from "react";
import "../userProfile/profile.css";
function UsingHook() {
  const [count, setCount] = useState(0);
  return (
    <div className="hookk">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
export default UsingHook;
