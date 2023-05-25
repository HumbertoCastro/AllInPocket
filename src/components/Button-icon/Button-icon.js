import React from 'react';
import PropTypes from 'prop-types';


const ButtonIcon = ({ iconSvg, callback, page }) => (
  <button className="b-icon" onClick={ callback }>
    {
      iconSvg()
    }
  </button>
);

ButtonIcon.propTypes = {};

ButtonIcon.defaultProps = {};

export default ButtonIcon;
