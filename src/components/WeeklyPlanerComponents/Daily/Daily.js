import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import HourlyCard from '../HourlyCard/HourlyCard';
import pocketContext from '../../../context/pocketContext';
import SetNewTask from '../SetNewTask/SetNewTask';

const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];


const Daily = () => {
  const [taskId, setTaskId] = useState(0);
  const [taskWeak, setTaskWeak] = useState("");
  const [selected, setSelected] = useState("Sun");
  const [onlyTasks, setOnly] = useState(false);
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

  const renderTheTasks = () => {
    const tasksToRender = onlyTasks ? tasks.filter(({ weak }) => weak === selected)[0].cardArray.filter((x) => !(x.overlap) && x.hasTask).map((task) => 
    (<HourlyCard callback={ addTask } task={ task } />)) :
    tasks.filter(({ weak }) => weak === selected)[0].cardArray.filter((x) => !(x.overlap)).map((task) => 
    (<HourlyCard callback={ addTask } task={ task } />));
    if (tasksToRender.length > 0) {
      return tasksToRender;
    } return (<h1 className='no-task'>No tasks to be displayed</h1>)
  }
  
  return(
    <div className="colunm s-evenly">
      <div className='row s-evenly'>
        {
          weekday.map((day) => (
            <button
              name={ day }
              className={ selected === day ? "selected s-scale" : null }
              onClick={ handleClick }
            >
              {
                day
              }
            </button>
          ))
        }
      </div>
      <label class="cyberpunk-checkbox-label">
      <input class="cyberpunk-checkbox" type="checkbox" onClick={ ({ target }) => {
        setOnly(!onlyTasks);
      } }/>Show only tasks</label>
      <button onClick={() => {
        localStorage.clear();
      } }>clear localStorage</button>
      {
        renderTheTasks()
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
