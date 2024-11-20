import React from "react";
import { useProvider } from '../context/provder';

function Buttonn() {
    const { dispatch, answer } = useProvider();
  return (
    <div className="option">
      <button
        onClick={() => {
          if (answer !== null) {
            dispatch({ type: "nextQuestion" });
          }
        }}
      >
        Next
      </button>
    </div>
  );
}

export default Buttonn;
