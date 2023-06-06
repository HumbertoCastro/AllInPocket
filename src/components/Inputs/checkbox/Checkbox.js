import React from 'react';
import "./checkbox.css"
import PropTypes from 'prop-types';


const Checkbox = ({ onClick, name }) => (
  <label class="cyberpunk-checkbox-label">
  <input class="cyberpunk-checkbox" type="checkbox" onClick={ ({ target }) => {
    onClick();
    const allCheck = [...document.querySelectorAll('.cyberpunk-checkbox')]
    allCheck.map((x) => x.checked = false);
    target.checked = true;
  } }/>
  { name }</label>
);

Checkbox.propTypes = {};

Checkbox.defaultProps = {};

export default Checkbox;
