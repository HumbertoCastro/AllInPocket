import React from 'react';


const TaskInformation = ({ task, id }) => {
  const {
    title,
    description,
  } = task;

  return(
    <div className="row s-evenly task-inf">
      <div className='colunm task-inf'>
        <h1>{ title }</h1>
        <p>{ description }</p>
      </div>
    </div>
  )
};

TaskInformation.propTypes = {};

TaskInformation.defaultProps = {};

export default TaskInformation;
