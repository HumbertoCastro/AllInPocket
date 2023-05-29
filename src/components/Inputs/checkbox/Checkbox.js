import React from 'react';
import "./checkbox.css"
import PropTypes from 'prop-types';


const Checkbox = ({ onClick }) => (
  <label class="cyberpunk-checkbox-label">
  <input class="cyberpunk-checkbox" type="checkbox" onClick={ onClick }/>
  Show only tasks</label>
);

Checkbox.propTypes = {};

Checkbox.defaultProps = {};

export default Checkbox;
