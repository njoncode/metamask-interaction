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
      ...account,
      accounts,
      connectedNetwork,
      connectedAccount,
      balance,
    });
    setLoading(false);
  };

  const handleMetamaskConnection = async () => {
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
      if ((await checkMetamaskIsConnected()) && !accountInfo.connectedAccount) {
        const { accounts, connectedNetwork, connectedAccount, balance } =
          await fetchMetamaskAccountDetails();
        setLoading(false);
        setAccountInfo({
          ...account,
          accounts,
          connectedNetwork,
          connectedAccount,
          balance,
        });
      }

      // Runs whenever account is switched, connected or disconnected
      window.ethereum.on('accountsChanged', (accounts) => {
        // Case1: accounts.length && accounts[0] !== connectedAccount
        if (accounts.length && accounts[0] !== accountInfo.connectedAccount) {
          setAccountInfo({
            ...accountInfo,
            accounts,
            connectedAccount: accounts[0],
          });
        }

        // Case2: accounts.length === 0
        if (!accounts.length) {
          setAccountInfo({
            ...accountInfo,
            accounts: [],
            connectedAccount: null,
          });
        }
      });

      console.log('accountInfo before networkChanged: ', accountInfo);
      // Runs whenever network changes
      window.ethereum.on('chainChanged', async (chainId) => {
        console.log('chainId: ', chainId);
        const changedNetwork = await metamaskNetworks(chainId);
        console.log('networkChanged: ', changedNetwork);
        console.log('accountInfo after networkChanged: ', accountInfo);
        setAccountInfo({
          ...accountInfo,
          connectedNetwork: changedNetwork.network,
        });
        // const accountsDetails = await fetchMetamaskAccountDetails();
        // setAccountInfo({
        //   ...accountsDetails,
        //   connectedNetwork: changedNetwork.network,
        // });
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
