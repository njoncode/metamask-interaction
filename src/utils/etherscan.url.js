export const generateEtherscanUrl = (connectedNetwork, connectedAccount) => {
  if (connectedNetwork === 'MAINNET') {
    return `https://etherscan.io/address/${connectedAccount}`;
  }

  return `https://${connectedNetwork.toLowerCase()}.etherscan.io/address/${connectedAccount}`;
};
