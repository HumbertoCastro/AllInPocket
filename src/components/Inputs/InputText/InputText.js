import React, { useContext } from 'react';
import './input.css'
import pocketContext from '../../../context/pocketContext';


const InputText = ({ name, callback, placename }) => {
  const {
    theme,
  } = useContext(pocketContext);
  return (
  <div class="form" style={ { backgroundColor: theme.backgroundColor, color: theme.textColor }}>
    <input class="input" name={ name } placeholder={ placename } required="" type="text" onChange={ callback } 
    style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}/>
    <span class="input-border"></span>
  </div>
)};

InputText.propTypes = {};

InputText.defaultProps = {};

export default InputText;
