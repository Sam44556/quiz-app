import React from "react";
import { useProvider } from '../context/provder';


    
function Progress() {
    const {numberOfQuestions, index, points, totalPoints } = useProvider();
  return (
    <div className="score">
      <p>
        Question <strong>{index+1 }</strong>/{numberOfQuestions}
      </p>
      <input type="range" min="0" max={numberOfQuestions} value={index} />
      <p>
        <strong>{points}</strong>/{totalPoints}
      </p>
    </div>
  );
}

export default Progress;
