import React from 'react';

import '../styles/homepage.css';

import { MetamaskContext } from '../services/metamask/metamask.context';
import { ConnectMetamask as MetamaskConnectButton } from '../components/ConnectMetamask';
import { AccountDetailsAndTransferEther } from '../components/AccountDetailsAndTransferEther';
import metamaskLogo from '../images/metamask.png';
import downloadMetamask from '../images/download-metamask.png';

import { Spinner } from '../components/Spinner';

const MetamaskAccount = () => {
  const {
    connectedNetwork,
    connectedAccount,
    balance,
    handleMetamaskConnection,
    handleTransferEther,
    isMetamaskInstalled,
    loading,
  } = React.useContext(MetamaskContext);

  console.log('🔥 loading: ', loading);

  console.log('🔥 isMetamaskInstalled: ', loading);

  return (
    <div className="homepage-container">
      {!loading && !isMetamaskInstalled && (
        <a href="https://metamask.io/" target="_blank" rel="noreferrer">
          <img
            className="install-metamask"
            src={downloadMetamask}
            alt="install metamask"
            style={{ width: '600px' }}
          />
        </a>
      )}

      {!loading && isMetamaskInstalled && !connectedAccount && (
        <div className="metamask-connector">
          <img src={metamaskLogo} alt="metamask" className="metamask-logo" />
          <MetamaskConnectButton
            handleMetamaskConnection={handleMetamaskConnection}
          />
        </div>
      )}

      {!loading && isMetamaskInstalled && connectedAccount && (
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

export default MetamaskAccount;
