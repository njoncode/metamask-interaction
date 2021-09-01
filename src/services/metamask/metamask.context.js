import React from 'react';
import PropTypes from 'prop-types';

import {
  connectMetamask,
  fetchMetamaskAccountDetails,
  checkMetamaskIsConnected,
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
  }, []);

  return (
    <MetamaskContext.Provider
      value={{ ...accountInfo, handleMetamaskConnection }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

MetamaskContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
