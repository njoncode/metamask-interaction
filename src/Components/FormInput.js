import React from 'react';
import PropTypes from 'prop-types';

import '../styles/formInput.scss';

const FormInput = ({ handleChange, label, name, value }) => {
  console.log('value: ', value);
  console.log('value.length: ', value.length);
  return (
    <div className="group">
      <input
        className="form-input"
        onChange={handleChange}
        name={name}
        value={value}
      />
      {label ? (
        <label className={`${value.length ? 'shrink' : ''} form-input-label`}>
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;

FormInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
