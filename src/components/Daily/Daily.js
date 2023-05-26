import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import HourlyCard from '../HourlyCard/HourlyCard';
import pocketContext from '../../context/pocketContext';
import SetNewTask from '../SetNewTask/SetNewTask';

const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];


const Daily = () => {
  const [taskId, setTaskId] = useState(0);
  const [taskWeak, setTaskWeak] = useState("");
  const [selected, setSelected] = useState("Sun");
  const {
    tasks,
    setTasks,
    openInterface,
    interfaceNewTask,
  } = useContext(pocketContext);

  const addTask = (id, weak) => {
    setTaskId(id);
    setTaskWeak(weak);
    openInterface(true);
  }

  const handleClick = ({ target: { name } }) => {
    setSelected(name);
  }
  
  return(
    <div className="colunm s-evenly">
      <div className='row s-evenly'>
        {
          weekday.map((day) => (
            <button
              name={ day }
              className={ selected === day ? "selected" : null }
              onClick={ handleClick }
            >
              {
                day
              }
            </button>
          ))
        }
      </div>
      {
        tasks.filter(({ weak }) => weak === selected)[0].cardArray.map(({ time, hasTask, task, id, weak }) => 
        (<HourlyCard time={ time } hasTask={ hasTask } callback={ addTask } task={ task } id={ id } weak={ weak } />))
      }
      {
        interfaceNewTask ? <SetNewTask id={ taskId } weak={ taskWeak } /> : null
      }
    </div>
  )
};

Daily.propTypes = {};

Daily.defaultProps = {};

export default Daily;
