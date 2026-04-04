import React from "react";

function Child({ name, clickFn }) {
  console.log("Child Re-renders");
  return (
    <div>
      <h2>Child : {name}</h2>
      <button onClick={clickFn}>Click Me</button>
    </div>
  );
}

export default React.memo(Child);
