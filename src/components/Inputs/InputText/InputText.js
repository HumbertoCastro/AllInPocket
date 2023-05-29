import React from 'react';
import './input.css'
import PropTypes from 'prop-types';


const InputText = ({ name, callback, placename }) => (
  <div class="form">
    <input class="input" name={ name } placeholder={ placename } required="" type="text" onChange={ callback } />
    <span class="input-border"></span>
  </div>
);

InputText.propTypes = {};

InputText.defaultProps = {};

export default InputText;
