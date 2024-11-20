import React from "react";
import { useProvider } from '../context/provder';

function Fin() {
    const { points, totalPoints } = useProvider();
  return (
    <div>
      <p>
        your result is
        <strong>{points}</strong>/{totalPoints}
      </p>
    </div>
  );
}

export default Fin;
