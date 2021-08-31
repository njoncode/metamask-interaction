import React from 'react';

import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

import { metamaskNetworks } from '../utils/constants';

const ConnectMetamask = () => {
  console.log('window.web3: ', window.web3);

  const account = {
    accounts: [],
    connectedNetwork: null,
    connectAccount: null,
    balance: null,
  };

  const [accountInfo, setAccountInfo] = React.useState(account);

  const handleConnect = async () => {
    // Check if metamask extension is installed in the browser
    if (typeof window.ethereum !== 'undefined') {
      try {
        // web3 instance for metamask
        const web3 = new Web3(window.ethereum);
        // console.log('web3: ', web3);

        // Fetch metamask provider (network)
        const provider = await detectEthereumProvider();
        // console.log('provider: ', provider);

        // console.log('provider: ', provider.chainId);
        // console.log('provider.chainId: ', typeof provider.chainId);

        // Figuring out network via chainId
        const { network } = metamaskNetworks(provider.chainId);
        // console.log('network: ', network);

        // Request Metamask account access
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        const balance = await web3.eth.getBalance(accounts[0]);
        setAccountInfo({
          ...account,
          accounts,
          connectedNetwork: network,
          connectAccount: accounts[0],
          balance,
        });
        //   return true;
      } catch (e) {
        console.error('handleConnect error: ', e);
        // User denied access
        return false;
      }
    } else {
      console.warn('Please install Metamask!');
    }
  };

  console.log('accountInfo: ', accountInfo);

  return (
    <div>
      <button type="submit" onClick={handleConnect}>
        Connect to MetaMask
      </button>
    </div>
  );
};

export default ConnectMetamask;
