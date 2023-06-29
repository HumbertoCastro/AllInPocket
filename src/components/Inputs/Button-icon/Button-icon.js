import React, { useContext } from 'react';
import pocketContext from '../../../context/pocketContext';


const ButtonIcon = ({ iconSvg, callback, id}) => {
  const {
    theme,
  } = useContext(pocketContext);
  return (
  <button className="b-icon" id={ `button-${id}` } onClick={ (button) => {
    callback();
    const allButtons = [...document.getElementsByClassName('b-icon')];
    allButtons.map((x) => x.className = 'b-icon');
    document.getElementById(`button-${id}`).className = "selected b-icon s-scale";
  } } style={ { color: theme.textColor,
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
