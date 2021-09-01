import React from 'react';
import PropTypes from 'prop-types';

import {
  connectMetamask,
  fetchMetamaskAccountDetails,
  checkMetamaskIsConnected,
  transferEther,
} from './metamask.service';

export const MetamaskContext = React.createContext();

const account = {
  accounts: [],
  connectedNetwork: null,
  connectedAccount: null,
  balance: null,
};

export const MetamaskContextProvider = ({ children }) => {
  const [accountInfo, setAccountInfo] = React.useState(account);

  const handleMetaMaskAccountDetails = async () => {
    const { accounts, connectedNetwork, connectedAccount, balance } =
      await fetchMetamaskAccountDetails();

    setAccountInfo({
      ...account,
      accounts,
      connectedNetwork,
      connectedAccount,
      balance,
    });
  };

  const handleMetamaskConnection = async () => {
    const web3 = await connectMetamask();
    console.log('web3: ', web3);

    await handleMetaMaskAccountDetails();
  };

  const handleTransferEther = async () => {
    const { accounts } = accountInfo;
    const amount = 0.00001;
    const receiverAddress = '0xb3Ad352862365fc5075134151D1124dD4f82b3bA';
    await transferEther(receiverAddress, amount);
  };

  React.useEffect(() => {
    (async () => {
      // only if metamask is connected
      if (await checkMetamaskIsConnected()) {
        const { accounts, connectedNetwork, connectedAccount, balance } =
          await fetchMetamaskAccountDetails();

        setAccountInfo({
          ...account,
          accounts,
          connectedNetwork,
          connectedAccount,
          balance,
        });
      }
    })();
  }, [accountInfo]);

  return (
    <MetamaskContext.Provider
      value={{ ...accountInfo, handleMetamaskConnection, handleTransferEther }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

MetamaskContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
