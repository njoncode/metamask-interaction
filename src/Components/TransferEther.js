import React from 'react';
import PropTypes from 'prop-types';

import transferEtherImage from '../images/transfer-eth.png';
import FormInput from './FormInput';
import CustomButton from './CustomButton';

import '../styles/transferEther.scss';

export const TransferEther = ({ handleTransferEther }) => {
  const [transferInput, setTransferInput] = React.useState({
    receiverAddress: '',
    amountToTransfer: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setTransferInput({
      ...transferInput,
      [name]: value,
    });
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    const { receiverAddress, amountToTransfer } = transferInput;
    handleTransferEther(receiverAddress, amountToTransfer);
  };

  return (
    <div className="transfer-ether-container">
      <img
        src={transferEtherImage}
        alt="transferEtherImage"
        className="transfer-eth-image"
      />
      <form className="transfer-ether-form" onSubmit={handleTransferSubmit}>
        <FormInput
          name="receiverAddress"
          type="text"
          handleChange={handleOnChange}
          value={transferInput.receiverAddress}
          label="Receiver Address"
          required
        />
        <FormInput
          name="amountToTransfer"
          type="text"
          value={transferInput.amountToTransfer}
          handleChange={handleOnChange}
          label="Amount to transfer"
          required
        />
        <div className="buttons">
          <CustomButton type="submit" btnTransferEth>
            Transfer Ether
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

TransferEther.propTypes = {
  handleTransferEther: PropTypes.func.isRequired,
};
