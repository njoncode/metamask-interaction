import React from 'react';
import PropTypes from 'prop-types';

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
