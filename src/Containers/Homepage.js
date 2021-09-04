import React from 'react';

import '../styles/homepage.css';

import { MetamaskContext } from '../services/metamask/metamask.context';
import { ConnectMetamask as MetamaskConnectButton } from '../components/ConnectMetamask';
import { AccountDetailsAndTransferEther } from '../components/AccountDetailsAndTransferEther';
import metamaskLogo from '../images/metamask.png';

import { Spinner } from '../components/Spinner';

const HomePage = () => {
  const {
    connectedNetwork,
    connectedAccount,
    balance,
    handleMetamaskConnection,
    handleTransferEther,
    loading,
  } = React.useContext(MetamaskContext);

  console.log('🚜🚛🚒loading: ', loading);

  return (
    <div className="homepage-container">
      {!loading && !connectedAccount && (
        <div className="metamask-connector">
          <img src={metamaskLogo} alt="metamask" className="metamask-logo" />
          <MetamaskConnectButton
            handleMetamaskConnection={handleMetamaskConnection}
          />
        </div>
      )}
      {!loading && connectedAccount && (
        <AccountDetailsAndTransferEther
          connectedAccount={connectedAccount}
          connectedNetwork={connectedNetwork}
          balance={balance}
          loading={loading}
          handleTransferEther={handleTransferEther}
        />
      )}
      {loading && <Spinner />}
    </div>
  );
};

export default HomePage;
