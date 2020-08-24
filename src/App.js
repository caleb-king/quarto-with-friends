import React from 'react';
import LandingPage from './landing-page/LandingPage';
import Setup from './setup/Setup';
import Game from './game/Game';
import { Switch, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/setup" render={() => (
          <Setup />
        )} />
        <Route path="/:gameID" render={() => (
          <Game />
        )} />
        <Route path="/" render={() => (
          <LandingPage />
        )} />
      </Switch>
    </div>
  );
}

export default App;
