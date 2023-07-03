import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../weather.css';
import pocketContext from '../../../context/pocketContext';


const Weather = () => {
  const {
    theme,
  } = useContext(pocketContext);

  return (
    <div style={ { color: theme.textColor }}>
      In development
    </div>
)};

Weather.propTypes = {};

Weather.defaultProps = {};

export default Weather;
