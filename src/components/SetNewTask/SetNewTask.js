import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import pocketContext from '../../context/pocketContext';
const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];


const SetNewTask = ({ id, weak }) => {
  const [title, setTitle] = useState('titulo');
  const [description, setDescription] = useState('Description');
  const [weakDays, setWeakDays] = useState([]);
  const [thisTaskId, setThisTaskId] = useState(0);
  const [onlyOnce, setOnlyOnce] = useState(false);

  const {
    openInterface,
    tasks,
    setTasks,
    setNofTasks,
    nTasks,
  } = useContext(pocketContext);

  useEffect(() => {
    const currentTask = tasks.filter((weakDay) => weakDay.weak === weak)[0].cardArray.find((x) => x.id === id);
    setThisTaskId(currentTask.taskId);
    setTitle(currentTask.task.title);
    setDescription(currentTask.task.description);
    if ( currentTask.taskId !== 0) {
      const weaksThatRepet = tasks.filter(({ cardArray }) => cardArray.some((x) => x.taskId === currentTask.taskId)).map((y) => y.weak);
      setWeakDays(weaksThatRepet);
    }
    const newTaskObject = document.querySelector(".new-task");
    newTaskObject.style.top = document.documentElement.scrollTop + 'px';
  }, [onlyOnce])

  const handleChange = ({ target: { value, name } }) => {
    name === "title" ? setTitle(value) : setDescription(value);
  }

  const handleWeakClick = ({ target: { name, className } }) => {
    weakDays.some((x) => x === name) ? setWeakDays(weakDays.filter((y) => y !== name)) : setWeakDays([...weakDays, name]);
  }

  const handleClick = () => {
    tasks.filter(({ cardArray }) => {
      cardArray.find((x) => x.taskId === thisTaskId) ? (cardArray.find((x) => x.taskId === thisTaskId).hasTask = false) : console.log('');
      cardArray.find((x) => x.taskId === thisTaskId) ? (cardArray.find((x) => x.taskId === thisTaskId).taskId = 0) : console.log('');;
      return cardArray
    });
    const newTasks = tasks;
    const newObject = {
      title,
      description,
    }
    !onlyOnce ? newTasks.filter((weakList) => weakDays.some((x) => x === weakList.weak)).forEach((x) => {
      x.cardArray.find((x) => x.id === id).task = newObject;
      x.cardArray.find((x) => x.id === id).hasTask = true;
      x.cardArray.find((x) => x.id === id).taskId = nTasks + 1;      
    }) : newTasks.filter((weakList) => weakList.weak === weak).forEach((x) => {
      x.cardArray.find((x) => x.id === id).task = newObject;
      x.cardArray.find((x) => x.id === id).hasTask = true;
      x.cardArray.find((x) => x.id === id).taskId = nTasks + 1;      
    })  
    setNofTasks(nTasks + 1);
    setTasks(newTasks);
    openInterface(false);
  }

  return(
    <div className="new-task colunm">
      <button className='x-btn' onClick={() => {
        openInterface(false);
      }}>
        Leave
      </button>
      <input type='text' placeholder='name of the task' value={ title } name="title" onChange={ handleChange } />
      <input type='text' placeholder='Description' value={ description } name="description" onChange={ handleChange } />
      repet on
      <div>
        {
          onlyOnce ? null : (
            weekday.map((x) => (
              <button
                name={ x }
                className={ weakDays.some((dayname) => dayname === x) ? "selected weak-day" : "weak-day"}
                onClick={ handleWeakClick }>
                {
                  x
                }
              </button>
            ))
          )
        }
      </div>
      <button onClick={() => {
        setOnlyOnce(!onlyOnce);
      }} className={ onlyOnce ? 'selected' : '' }>
        Only this time
      </button>
      <button onClick={ handleClick }>
        <p>
          Create New Task
        </p>
      </button>
    </div>
  )
};

SetNewTask.propTypes = {};

SetNewTask.defaultProps = {};

export default SetNewTask;
