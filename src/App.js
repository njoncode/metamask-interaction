import React from 'react';

import HomePage from './containers/Homepage';
import { MetamaskContextProvider } from './services/metamask/metamask.context';

import './App.css';

function App() {
  return (
    <div className="App">
      <MetamaskContextProvider>
        <HomePage />
      </MetamaskContextProvider>
    </div>
  );
}

export default App;
