import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

import { metamaskNetworks } from '../../utils/constants';

export const connectMetamask = async () => {
  try {
    // Check if metamask extension is installed in the browser
    if (typeof window.ethereum !== 'undefined') {
      // web3 instance for metamask
      const web3 = new Web3(window.ethereum);

      // await window.ethereum.enable();

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      return web3;
    }
    console.warn('Please install Metamask!');
    return false;
  } catch (err) {
    // User denied access
    console.error('handleConnect error: ', err);
  }
};

export const checkMetamaskIsConnected = async () => {
  try {
    // Check if metamask extension is installed in the browser
    if (typeof window.ethereum !== 'undefined') {
      // web3 instance for metamask
      const web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts();

      return !!accounts.length;
    }

    return false;
  } catch (err) {
    // User denied access
    console.error('handleConnect error: ', err);
    return false;
  }
};

export const fetchMetamaskAccountDetails = async () => {
  try {
    const web3 = await connectMetamask();

    // Fetch metamask provider (network)
    const provider = await detectEthereumProvider();

    // Figuring out network via chainId
    const { network } = metamaskNetworks(provider.chainId);

    // Request Metamask account access
    // await window.ethereum.enable();
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);

    return {
      accounts,
      connectedNetwork: network,
      connectedAccount: accounts[0],
      balance: web3.utils.fromWei(balance, 'ether'),
    };
  } catch (err) {
    console.error('fetchMetamaskAccountDetails error : ', err);
    return {
      accounts: [],
      connectedNetwork: null,
      connectedAccount: null,
      balance: null,
    };
  }
};

export const transferEther = async (receiver, amount) => {
  const web3 = new Web3(window.ethereum);
  console.log('web3: ', web3);
  const accounts = await web3.eth.getAccounts();
  const sender = accounts[0];
  console.log('sender: ', sender);
  console.log('receiver: ', receiver);
  const amountToTransfer = web3.utils.toWei(String(amount), 'ether');
  console.log('amountToTransfer: ', amountToTransfer);
  await web3.eth.sendTransaction({
    from: sender,
    to: receiver,
    value: amountToTransfer,
  });
  await web3.eth.getBalance(sender);
};
