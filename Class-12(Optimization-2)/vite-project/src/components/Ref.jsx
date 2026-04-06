// useRef

import React from "react";
import { useRef } from "react";
import { useState } from "react";

function Ref() {
  const [text, setText] = useState("");

 const inputRef =  useRef(null)

 console.log(inputRef)

  function reset() {
    setText("");
    inputRef.current.focus()
    inputRef.current.style.backgroundColor = 'red'
    

  }

  return (
    <div>
      <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Ref;
