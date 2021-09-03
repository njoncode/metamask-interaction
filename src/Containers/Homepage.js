import React from 'react';

import '../styles/homepage.css';

import { MetamaskContext } from '../services/metamask/metamask.context';
import { ConnectMetamask as MetamaskConnectButton } from '../components/ConnectMetamask';
import { AccountDetailsAndTransferEther } from '../components/AccountDetailsAndTransferEther';
import metamaskLogo from '../images/metamask.png';

const HomePage = () => {
  const {
    connectedNetwork,
    connectedAccount,
    balance,
    handleMetamaskConnection,
    handleTransferEther,
    loading,
  } = React.useContext(MetamaskContext);

  return (
    <div className="homepage-container">
      {!connectedAccount && (
        <div className="metamask-connector">
          <img src={metamaskLogo} alt="metamask" className="metamask-logo" />
          <MetamaskConnectButton
            handleMetamaskConnection={handleMetamaskConnection}
          />
        </div>
      )}
      {connectedAccount && (
        <AccountDetailsAndTransferEther
          connectedAccount={connectedAccount}
          connectedNetwork={connectedNetwork}
          balance={balance}
          loading={loading}
          handleTransferEther={handleTransferEther}
        />
      )}
    </div>
  );
};

export default HomePage;
