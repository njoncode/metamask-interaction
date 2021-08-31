export const metamaskNetworks = (chainId) => {
  let network = '';
  let error = false;

  switch (chainId) {
    case '0x1':
      network = 'MAINNET';
      break;
    case '0x3':
      network = 'ROPSTEN';
      break;
    case '0x4':
      network = 'RINKEBY';
      break;
    case '0x5':
      network = 'GOERLI';
      break;
    case '0x2a':
      network = 'KOVAN';
      break;
    default:
      error = true;
  }

  return {
    network,
    error,
  };
};

// Networks Associated ChainIds:
// 0x1 	1 	Ethereum Main Network (Mainnet)
// 0x3 	3 	Ropsten Test Network
// 0x4 	4 	Rinkeby Test Network
// 0x5 	5 	Goerli Test Network
// 0x2a 	42 	Kovan Test Network
