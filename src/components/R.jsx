import React from "react";
import { useProvider } from '../context/provder';
function Read() {
    const { nq, dispatch }= useProvider();
  return (
    <div className="home-1">
      <h1  className="home-2">WELLCOME </h1>
      <h3  className="home-3">their are {nq} question to test your masstery on computer and it science </h3>
      <button  className="home-3"onClick={() => dispatch({ type: "start" })}> let start</button>
    </div>
  );
}
export default Read;
