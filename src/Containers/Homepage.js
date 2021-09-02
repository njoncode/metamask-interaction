import React from 'react';

import '../styles/homepage.css';

import { MetamaskContext } from '../services/metamask/metamask.context';
import { ConnectMetamask as MetamaskConnectButton } from '../components/ConnectMetamask';
import { AccountDetails as ConnectedAccountDetails } from '../components/AccountDetails';
import { TransferEther } from '../components/TransferEther';
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

  /**
   * Possible states:
   * CONNECT_METAMASK - Active when no account is found.
   * ACCOUNT_DETAILS - Active when account is found (default case).
   * TRANFER_ETHER - Active when account is found.
   */
  // const [formState, setFormState] = React.useState(null);

  // React.useEffect(() => {
  //   if (connectedAccount) {
  //     setFormState('ACCOUNT_DETAILS');
  //     return;
  //   }
  //   setFormState('CONNECT_METAMASK');
  // }, [connectedAccount]);

  // const handleViewTransferEther = () => {
  //   setFormState('TRANSFER_ETHER');
  // };

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
      {/* {connectedAccount && (
        <ConnectedAccountDetails
          connectedAccount={connectedAccount}
          connectedNetwork={connectedNetwork}
          balance={balance}
          loading={loading}
        />
      )}
      {connectedAccount && (
        <button type="submit">TransferEther</button>
        <TransferEther handleTransferEther={handleTransferEther} />
      )} */}
    </div>
  );
};

export default HomePage;
