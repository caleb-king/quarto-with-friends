import React from 'react';

function Directions(props) {
  const { directionString, myTurn, phase } = props;
  let directionClass = 'direction';
  if (myTurn) {
    if (phase === 'selection') {
      directionClass += ' selection-phase';
    } else {
      directionClass += ' placement-phase';
    }
  }

  return (
    <div className="direction-container">
      <p className={directionClass}>
        {directionString}
      </p>
    </div>
  );
}

export default Directions;
