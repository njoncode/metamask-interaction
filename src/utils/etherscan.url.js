export const generateEtherscanUrl = (connectedNetwork, connectedAccount) => {
  if (connectedNetwork === 'MAINNET') {
    return `https://etherscan.io/address/${connectedAccount}`;
  }

  return `https://${
    connectedNetwork != null ? connectedNetwork.toLowerCase() : ''
  }.etherscan.io/address/${connectedAccount}`;
};
