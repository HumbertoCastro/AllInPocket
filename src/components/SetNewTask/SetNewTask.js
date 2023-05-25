import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import pocketContext from '../../context/pocketContext';


const SetNewTask = ({ id }) => {
  const [title, setTitle] = useState('titulo');
  const [description, setDescription] = useState('Description');

  const {
    openInterface,
    tasks,
    setTasks,
  } = useContext(pocketContext);

  useEffect(() => {
    console.log('useefect');
    const currentTask = tasks.find((x) => x.id === id).task;
    setTitle(currentTask.title);
    setDescription(currentTask.description);
    const newTaskObject = document.querySelector(".new-task");
    newTaskObject.style.top = document.documentElement.scrollTop + 'px';
  }, [])

  const handleChange = ({ target: { value, name } }) => {
    name === "title" ? setTitle(value) : setDescription(value);
  }

  const handleClick = () => {
    console.log(tasks, title, description)
    const newTasks = tasks;
    const newObject = {
      title,
      description,
    }
    newTasks.find((x) => x.id === id).task = newObject;
    newTasks.find((x) => x.id === id).hasTask = true;
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
