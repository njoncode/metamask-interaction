import React from 'react';
import PropTypes from 'prop-types';

import { shortAddress } from '../utils/address.format';

import '../styles/AccountDetails.css';

export const AccountDetails = ({
  connectedAccount,
  connectedNetwork,
  balance,
}) => (
  <div className="account-container">
    <h2>Account Details</h2>
    <div className="account-details">
      <p>
        Account Address: {connectedAccount && shortAddress(connectedAccount)}
      </p>
      <p>Connected Network: {connectedNetwork} </p>
      <p>Account Balance: {balance} </p>
    </div>
  </div>
);

AccountDetails.propTypes = {
  connectedAccount: PropTypes.string.isRequired,
  connectedNetwork: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
};
