import React from 'react';
import PropTypes from 'prop-types';

import { transferEther } from '../services/metamask/metamask.service';

export const TransferEther = ({ handleTransferEther }) => (
  <div>
    <button type="submit" onClick={handleTransferEther}>
      Transfer Ether
    </button>
  </div>
);

TransferEther.propTypes = {
  handleTransferEther: PropTypes.func.isRequired,
};
