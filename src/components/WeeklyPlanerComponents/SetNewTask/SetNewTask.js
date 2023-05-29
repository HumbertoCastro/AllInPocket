import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import pocketContext from '../../../context/pocketContext';
import svgs from '../../../helpers/svg';
import Checkbox from '../../Inputs/checkbox/Checkbox';
import ColorsSelect from '../../Inputs/ColorsSelect/ColorsSelect';
import InputText from '../../Inputs/InputText/InputText';
const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
const Tempos = ['00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00'];

const SetNewTask = ({ id, weak }) => {  
  const [title, setTitle] = useState('titulo');
  const [description, setDescription] = useState('Description');
  const [weakDays, setWeakDays] = useState([]);
  const [thisTaskId, setThisTaskId] = useState(0);
  const [onlyOnce, setOnlyOnce] = useState(false);
  const [duration, setDuration] = useState(1);
  const [color, setColor] = useState('#00000');

  const {
    openInterface,
    tasks,
    setTasks,
    setNofTasks,
    nTasks,
  } = useContext(pocketContext);

  useEffect(() => {
    const currentTask = tasks.filter((weakDay) => weakDay.weak === weak)[0].cardArray.find((x) => x.id === id);
    setWeakDays([weak]);
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
      for (let i = id + 1; i < parseInt(cardArray[id].task.duration) + id; i += 1) {
        cardArray[i].overlap = false;
        cardArray[i].task.duration = '0';
      }
      return cardArray;
    });
    const newTasks = tasks;
    const newObject = {
      title,
      description,
      duration,
    }
    !onlyOnce ? newTasks.filter((weakList) => weakDays.some((x) => x === weakList.weak)).forEach((x) => {
      for (let i = id + 1; i < id + parseInt(duration); i += 1) {
        x.cardArray[i].overlap = true;
      }
      Object.assign(x.cardArray.find((x) => x.id === id), {
        task: newObject,
        hasTask: true,
        taskId: nTasks + 1,
        color,
      })
    }) : newTasks.filter((weakList) => weakList.weak === weak).forEach((x) => {
      for (let i = id + 1; i < id + duration; i += 1) {
        x.cardArray[i].overlap = true;
      }
      Object.assign(x.cardArray.find((x) => x.id === id), {
        task: newObject,
        hasTask: true,
        taskId: nTasks + 1,
        color,
      })     
    })
    setDuration(0);
    setNofTasks(nTasks + 1);
    setTasks(newTasks);
    openInterface(false);
    localStorage.setItem('tasklist', JSON.stringify(newTasks));
  }

  return(
    <div className="new-task colunm s-evenly">
      <button className='x-btn' onClick={() => {
        openInterface(false);
      }}>
        {
          svgs.exit()
        }
      </button>
      <InputText name="title" callback={ handleChange } placename="Task Title" />
      <InputText name="description" callback={ handleChange } placename="Task Description" />
      {
        onlyOnce ? null :
        <div>
          Repet on:
          {
            (
              weekday.map((x) => (
                <button
                  name={ x }
                  className={ weakDays.some((dayname) => dayname === x) ? "selected weak-day s-scale" : "weak-day"}
                  onClick={ handleWeakClick }>
                  {
                    x
                  }
                </button>
              ))
            )
          }
        </div>
      }
      <Checkbox onClick={ () => setOnlyOnce(!onlyOnce) } />
      <select onChange={({ target: { value } }) => {
          setDuration(value);
        }}>
        <option value="1">How long will it last</option>
            {
              Tempos.map((x, index) => (
                <option value={ index + 1 } key={ `${index}-${x}` }>{ x }</option>
              ))
            }
      </select>
      <label className='colunm s-evenly'>Choose the color for the task
       <ColorsSelect selectedColor={ color } callback={ setColor }/>
      </label>
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
