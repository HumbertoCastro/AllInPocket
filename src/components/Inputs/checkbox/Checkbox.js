import React, { useContext } from 'react';
import "./checkbox.css"
import pocketContext from '../../../context/pocketContext';


const Checkbox = ({ onClick, name }) => {
  const {
    theme,
  } = useContext(pocketContext);
  return (
    <label class="cyberpunk-checkbox-label" style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}>
    <input class="cyberpunk-checkbox" type="checkbox" onClick={ ({ target }) => {
      onClick();
      const allCheck = [...document.querySelectorAll('.cyberpunk-checkbox')]
      allCheck.map((x) => x.checked = false);
      target.checked = true;
    } }/>
    { name }</label>
)};

Checkbox.propTypes = {};

Checkbox.defaultProps = {};

export default Checkbox;
