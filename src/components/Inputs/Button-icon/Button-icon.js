import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import pocketContext from '../../../context/pocketContext';


const ButtonIcon = ({ iconSvg, callback, id, name }) => {
  const { setPageName } = useContext(pocketContext);
  return (
  <button className="b-icon" id={ `button-${id}` } onClick={ (button) => {
    callback();
    setPageName(name)
    const allButtons = [...document.getElementsByClassName('b-icon')];
    allButtons.map((x) => x.className = 'b-icon');
    document.getElementById(`button-${id}`).className = "selected b-icon s-scale";
  } }>
    {
      iconSvg()
    }
  </button>
  )
};

ButtonIcon.propTypes = {};

ButtonIcon.defaultProps = {};

export default ButtonIcon;
