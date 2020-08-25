import React, { useState } from 'react';
import LandingPage from './landing-page/LandingPage';
import Setup from './setup/Setup';
import Game from './game/Game';
import { Switch, Route } from "react-router-dom";
import './App.css';

function App() {
  const [currPlayer, setCurrPlayer] = useState('Toby');

  return (
    <div className="App">
      <Switch>
        <Route path="/setup" render={() => (
          <Setup 
            setCurrPlayer={setCurrPlayer}
          />
        )} />
        <Route path="/:gameID" render={() => (
          <Game 
          currPlayer={currPlayer}
          setCurrPlayer={setCurrPlayer}
          />
        )} />
        <Route path="/" render={() => (
          <LandingPage />
        )} />
      </Switch>
    </div>
  );
}

export default App;
