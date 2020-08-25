import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
      <header>
        <img className="logo" src="/images/quarto-logo.png" alt="Quarto Logo"/>
        <h1>
          Quarto With Friends
        </h1>
      </header>
      <main>
        <p>Quarto is a modern classic strategy game using pieces which combine 4 attributes – size, color, shape, and consistency:</p>
        <img className="comparing-attributes" src="/images/attribute-comparison.png" alt="comparison of dichotomous attributes" />
        <p>The goal is to place the fourth piece in a row or diagonal where each piece shares one attribute in common.</p>
        <p>The twist is that your opponent chooses the piece you place on the board each turn.</p>
        <div className="button-container">
          <Link to='/setup' className="button">
            START A GAME
          </Link>
        </div>
      </main>
    </>
  );
}

export default LandingPage;
