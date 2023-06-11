import React from 'react';
import PropTypes from 'prop-types';


const ButtonIcon = ({ iconSvg, callback, id}) => {
  return (
  <button className="b-icon" id={ `button-${id}` } onClick={ (button) => {
    callback();
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
