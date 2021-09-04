import React from 'react';
import PropTypes from 'prop-types';

import {
  connectMetamask,
  fetchMetamaskAccountDetails,
  checkMetamaskIsConnected,
  transferEther,
} from './metamask.service';

import { metamaskNetworks } from '../../utils/constants';

export const MetamaskContext = React.createContext();

const account = {
  accounts: [],
  connectedNetwork: null,
  connectedAccount: null,
  balance: null,
};

export const MetamaskContextProvider = ({ children }) => {
  const [accountInfo, setAccountInfo] = React.useState(account);

  const [loading, setLoading] = React.useState(true);

  const handleMetaMaskAccountDetails = async () => {
    const { accounts, connectedNetwork, connectedAccount, balance } =
      await fetchMetamaskAccountDetails();

    setAccountInfo({
      ...accountInfo,
      accounts,
      connectedNetwork,
      connectedAccount,
      balance,
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleMetamaskConnection = async () => {
    setLoading(true);
    const web3 = await connectMetamask();
    console.log('web3: ', web3);
    await handleMetaMaskAccountDetails();
  };

  const handleTransferEther = async (receiverAddress, amount) => {
    const { balance } = accountInfo;
    await transferEther(receiverAddress, amount);
    await handleMetaMaskAccountDetails();
  };

  React.useEffect(() => {
    (async () => {
      // only if metamask is connected
      if (await checkMetamaskIsConnected()) {
        const { accounts, connectedNetwork, connectedAccount, balance } =
          await fetchMetamaskAccountDetails();
        setAccountInfo({
          ...accountInfo,
          accounts,
          connectedNetwork,
          connectedAccount,
          balance,
        });
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }

      // Runs whenever account is switched, connected or disconnected
      window.ethereum.on('accountsChanged', async (accounts) => {
        setLoading(true);
        // Case1: accounts.length && accounts[0] !== connectedAccount
        if (accounts.length && accounts[0] !== accountInfo.connectedAccount) {
          const { connectedNetwork } = await fetchMetamaskAccountDetails();

          setAccountInfo({
            ...accountInfo,
            accounts,
            connectedAccount: accounts[0],
            connectedNetwork,
          });

          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }

        // Case2: accounts.length === 0
        if (!accounts.length) {
          setAccountInfo({
            ...accountInfo,
            accounts: [],
            connectedAccount: null,
          });
        }
        //  This will set connectedAccount to null which will render the ConnectMetamask component (asking user to connect to Metamask)
      });

      // Runs whenever network changes
      window.ethereum.on('chainChanged', async (chainId) => {
        setLoading(true);
        const accountsDetails = await fetchMetamaskAccountDetails();
        setAccountInfo({
          ...accountsDetails,
        });

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
    })();
  }, []);

  return (
    <MetamaskContext.Provider
      value={{
        ...accountInfo,
        handleMetamaskConnection,
        handleTransferEther,
        loading,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

MetamaskContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
