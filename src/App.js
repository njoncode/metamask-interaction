import React from 'react';

import MetamaskAccount from './containers/MetamaskAccount';
import { MetamaskContextProvider } from './services/metamask/metamask.context';

import './App.css';

function App() {
  return (
    <div className="App">
      <MetamaskContextProvider>
        <MetamaskAccount />
      </MetamaskContextProvider>
    </div>
  );
}

export default App;
