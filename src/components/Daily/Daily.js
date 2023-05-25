import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import HourlyCard from '../HourlyCard/HourlyCard';
import pocketContext from '../../context/pocketContext';
import SetNewTask from '../SetNewTask/SetNewTask';


const Daily = () => {
  const [taskId, setTaskId] = useState(0);
  const {
    tasks,
    setTasks,
    openInterface,
    interfaceNewTask,
  } = useContext(pocketContext);

  const addTask = (id) => {
    setTaskId(id);
    openInterface(true);
  }
  
  return(
    <div className="colunm s-evenly">
      <h1>tesdte</h1>
      {
        tasks.map(({ time, hasTask, task, id }) => (<HourlyCard time={ time } hasTask={ hasTask } callback={ addTask } task={ task } id={ id } />))
      }
      {
        interfaceNewTask ? <SetNewTask id={ taskId } /> : null
      }
    </div>
  )
};

Daily.propTypes = {};

Daily.defaultProps = {};

export default Daily;
