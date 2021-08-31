import React from 'react';

import { MetamaskContext } from '../services/metamask/metamask.context';
import { ConnectMetamask as MetamaskConnectButton } from '../components/ConnectMetamask';
import { AccountDetails as ConnectedAccountDetails } from '../components/AccountDetails';

const HomePage = () => {
  const {
    connectedAccount,
    connectedNetwork,
    balance,
    handleMetamaskConnection,
  } = React.useContext(MetamaskContext);

  return (
    <div>
      <MetamaskConnectButton
        handleMetamaskConnection={handleMetamaskConnection}
      />
      <ConnectedAccountDetails
        connectedAccount={connectedAccount}
        connectedNetwork={connectedNetwork}
        balance={balance}
      />
    </div>
  );
};

export default HomePage;
