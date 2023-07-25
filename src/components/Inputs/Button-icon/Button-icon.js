import React, { useContext, useState } from 'react';
import pocketContext from '../../../context/pocketContext';


const ButtonIcon = ({ iconSvg, callback, id}) => {
  const btn = document.querySelector(`#button-${id}`);
  const {
    theme,
  } = useContext(pocketContext);
  return (
  <button className="b-icon" id={ `button-${id}` } onClick={ () => {
    callback();
    document.querySelector(`#button-${id}`).className = 'selected b-icon'
  } } style={ { color: btn ? btn.className === 'selected b-icon' ? '#73C0FC' : theme.textColor : theme.textColor,
  backgroundColor: theme.backgroundColor  } }>
    {
      iconSvg()
    }
  </button>
  )
};

ButtonIcon.propTypes = {};

ButtonIcon.defaultProps = {};

export default ButtonIcon;
