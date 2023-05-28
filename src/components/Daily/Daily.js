import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import HourlyCard from '../HourlyCard/HourlyCard';
import pocketContext from '../../context/pocketContext';
import SetNewTask from '../SetNewTask/SetNewTask';
import Checkbox from '../checkbox/Checkbox';

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
      <Checkbox onClick={ () => setOnly(!onlyTasks) } />
      <button onClick={() => {
        localStorage.clear();
      } }>clear localStorage</button>
      {
        onlyTasks ? tasks.filter(({ weak }) => weak === selected)[0].cardArray.filter((x) => !(x.overlap) && x.hasTask).map((task) => 
        (<HourlyCard callback={ addTask } task={ task } />)) :
        tasks.filter(({ weak }) => weak === selected)[0].cardArray.filter((x) => !(x.overlap)).map((task) => 
        (<HourlyCard callback={ addTask } task={ task } />))
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
