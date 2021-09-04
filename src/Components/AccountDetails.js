import React from 'react';
import PropTypes from 'prop-types';
import { FiLink } from 'react-icons/fi';

import { shortAddress } from '../utils/address.format';
import { generateEtherscanUrl } from '../utils/etherscan.url';

import '../styles/accountDetails.scss';
import ethLogo from '../images/eth.png';

export const AccountDetails = ({
  connectedAccount,
  connectedNetwork,
  balance,
}) => (
  <div className="account-container">
    <>
      <img src={ethLogo} alt="ethLogo" className="eth-logo" />
      <h2 className="account-details-heading">Account Details</h2>
      <div className="account-details">
        <p>
          Account Address:
          {connectedAccount && (
            <span className="account-details-values">
              <a
                href={generateEtherscanUrl(connectedNetwork, connectedAccount)}
                target="_blank"
                rel="noreferrer"
                className="etherscan-url"
              >
                <FiLink color="#4c4c4c" size={15} />
                <span className="account-details-values">
                  {shortAddress(connectedAccount)}
                </span>
              </a>
            </span>
          )}
        </p>
        <p>
          Connected Network:{' '}
          <span className="account-details-values">{connectedNetwork}</span>
        </p>
        <p>
          Account Balance:{' '}
          <span className="account-details-values">
            {balance != null ? `${Number(balance).toFixed(8)} ETH` : `- ETH`}
          </span>
        </p>
      </div>
    </>
  </div>
);

AccountDetails.propTypes = {
  connectedAccount: PropTypes.string.isRequired,
  connectedNetwork: PropTypes.string.isRequired,
  balance: PropTypes.string,
};

// link : https://rinkeby.etherscan.io/address/0xb3ad352862365fc5075134151d1124dd4f82b3ba
