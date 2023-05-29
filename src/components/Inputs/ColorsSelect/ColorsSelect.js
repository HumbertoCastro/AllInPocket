import React from 'react';
import PropTypes from 'prop-types';

const colors = ["#F2B21F", "#6AF676", "#6ADAF6", "#5B6AD4", "#F76AD9", "#BAD45B", "#C069F5", "#C212D6", "#D44539", "#C2EB4C", "#B9EBC5", "#B5D5F5"];

const ColorsSelect = ({ callback, selectedColor }) => (
  <div className='colors-div'>
    {
    colors.map((cor) => (
      <button
        className={ selectedColor === cor ? "s-scale color-button" : "color-button" }
        style={ {
          backgroundColor: cor,
        } }
        onClick={() => callback(cor)}
      />))
    }
  </div >
);

ColorsSelect.propTypes = {};

ColorsSelect.defaultProps = {};

export default ColorsSelect;
