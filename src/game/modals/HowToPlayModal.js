import React from 'react';

function HowToPlayModal(props) {
  const { setShowHowTo } = props;

  function closeModal() {
    setShowHowTo(false);
  }
  
  return (
    <div className="modal fixed how-to-play-container">
      <h2>How To Play</h2>
      <i className="fas fa-times" onClick={closeModal}></i>
      <p>Quarto is a modern classic strategy game using pieces which combine 4 attributes – size, color, shape, and consistency:</p>
      <img className="comparing-attributes" src="/images/attribute-comparison.png" alt="comparison of dichotomous attributes" />
      <p>The goal is to place the fourth piece in a row or diagonal where each piece shares one attribute in common.</p>
      <p>The twist is that your opponent chooses the piece you place on the board each turn.</p>
    </div>
  );
}

export default HowToPlayModal;
