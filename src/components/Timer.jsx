import React, { useEffect } from "react";
import { useProvider } from '../context/provder';

    
function Timer() {
    const { dispatch, secrem} = useProvider();
  const m = Math.floor(secrem / 60);
  const s = secrem % 60;
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {m}:{s}
    </div>
  );
}
export default Timer;
