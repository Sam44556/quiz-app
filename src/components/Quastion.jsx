import React from "react";
import Option from "./Option";
import { useProvider } from '../context/provder';

function Quastion() {
    const { questions ,index}= useProvider();
  return (
    <div className="questions">
      <h4>{index+1}  {questions[index].question}</h4>
      <Option />
    </div>
  );
}

export default Quastion;
