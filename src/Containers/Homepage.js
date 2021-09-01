import React from 'react';

import { MetamaskContext } from '../services/metamask/metamask.context';
import { ConnectMetamask as MetamaskConnectButton } from '../components/ConnectMetamask';
import { AccountDetails as ConnectedAccountDetails } from '../components/AccountDetails';
import { TransferEther } from '../components/TransferEther';

const HomePage = () => {
  const {
    connectedNetwork,
    connectedAccount,
    balance,
    handleMetamaskConnection,
    handleTransferEther,
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
      <TransferEther handleTransferEther={handleTransferEther} />
    </div>
  );
};

export default HomePage;
