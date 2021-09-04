import React from 'react';
import PropTypes from 'prop-types';

import '../styles/connectMetamask.css';

export const ConnectMetamask = ({ handleMetamaskConnection }) => (
  <div>
    <button type="submit" onClick={handleMetamaskConnection}>
      Connect to MetaMask
    </button>
  </div>
);

ConnectMetamask.propTypes = {
  handleMetamaskConnection: PropTypes.func.isRequired,
};
