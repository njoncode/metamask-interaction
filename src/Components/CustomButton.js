import React from 'react';
import PropTypes from 'prop-types';

import '../styles/customButton.scss';

const CustomButton = ({ children, btnTransferEth }) => (
  // <button type="submit" className="custom-button">
  <button
    type="submit"
    className={`${
      btnTransferEth ? 'btn-transfer-eth custom-button' : 'custom-button'
    }`}
  >
    {children}
  </button>
);
export default CustomButton;

CustomButton.propTypes = {
  children: PropTypes.string.isRequired,
  btnTransferEth: PropTypes.bool.isRequired,
};

// className={`${btn-transfer-eth ? 'btn-transfer-eth' : ''} custom-button`}
