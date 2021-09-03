import React from 'react';
import PropTypes from 'prop-types';

import { AccountDetails } from './AccountDetails';
import { TransferEther } from './TransferEther';

import '../styles/accountDetailsAndTransferEther.css';

export const AccountDetailsAndTransferEther = ({
  connectedAccount,
  connectedNetwork,
  balance,
  loading,
  handleTransferEther,
}) => (
  <div className="account-details-and-transfer-ether-container">
    <AccountDetails
      connectedAccount={connectedAccount}
      connectedNetwork={connectedNetwork}
      balance={balance}
      loading={loading}
    />
    <TransferEther handleTransferEther={handleTransferEther} />
  </div>
);

AccountDetailsAndTransferEther.propTypes = {
  connectedAccount: PropTypes.string.isRequired,
  connectedNetwork: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  handleTransferEther: PropTypes.func.isRequired,
};
