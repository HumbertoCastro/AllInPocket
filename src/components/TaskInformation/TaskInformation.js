import React from 'react';
import PropTypes from 'prop-types';


const TaskInformation = ({ task: { task } }) => {
  const {
    title,
    description,
  } = task;
  return(
    <div className="colunm s-evenly">
      <h1>{ title }</h1>
      <p>{ description }</p>
    </div>
  )
};

TaskInformation.propTypes = {};

TaskInformation.defaultProps = {};

export default TaskInformation;
