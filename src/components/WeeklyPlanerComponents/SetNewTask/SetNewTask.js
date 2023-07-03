import React, { useContext, useEffect, useState } from 'react';
import pocketContext from '../../../context/pocketContext';
import svgs from '../../../helpers/svg';
import Checkbox from '../../Inputs/checkbox/Checkbox';
import ColorsSelect from '../../Inputs/ColorsSelect/ColorsSelect';
import InputText from '../../Inputs/InputText/InputText';
const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
const Tempos = ['00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00'];

const SetNewTask = ({ id:{ id, taskId }, weak, openInterface }) => {  
  const [title, setTitle] = useState('Task title');
  const [description, setDescription] = useState('Task description');
  const [weakDays, setWeakDays] = useState([]);
  const [onlyOnce, setOnlyOnce] = useState(false);
  const [duration, setDuration] = useState(1);
  const [color, setColor] = useState('#00000');
  const [rmBtn, setRmBtn] = useState(false);

  const {
    tasks,
    setTasks,
    setNofTasks,
    nTasks,
    theme,
  } = useContext(pocketContext);

  useEffect(() => {
    console.log(tasks);
    const currentTask = tasks.filter((weakDay) => weakDay.weak === weak)[0].cardArray.find((x) => x.id === id);
    setWeakDays([weak]);
    setTitle(currentTask.task.title);
    setDescription(currentTask.task.description);
    setColor(currentTask.color);
    console.log(currentTask);
    if ( currentTask.taskId !== 0) {
      const weaksThatRepet = tasks.filter(({ cardArray }) => cardArray.some((x) => x.taskId === currentTask.taskId)).map((y) => y.weak);
      setWeakDays(weaksThatRepet);
      setRmBtn(true);
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

  const handleDelete = () => {
    tasks.filter(({ cardArray }) => {
      for (let i = id + 1; i < parseInt(cardArray[id].task.duration) + id; i += 1) {
        cardArray[i].overlap = false;
        cardArray[i].task.duration = '0';
      }
      return cardArray;
    });
    const filter = tasks;
    for (let i = 0; i < filter.length; i += 1) {
      filter[i].cardArray.forEach((x) => {
        if (x.taskId === taskId) {
          x.hasTask = false;
          x.taskId = 0;
          x.color = 'teste';
          setNofTasks(nTasks - 1);
        }
      })
    }
    setTasks(filter);
    openInterface(false);
    localStorage.setItem('tasklist', JSON.stringify(filter));
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
    <div className="new-task colunm s-evenly scale-in-ver-top " style={ {
      backgroundColor: theme.primaryColor, color: theme.textColor, boxShadow: theme.boxShadow }}>
      <button className='x-btn' onClick={() => {
        openInterface(false);
      }} style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}>
        {
          svgs.exit()
        }
      </button>
      <InputText name="title" callback={ handleChange } placename={ title } />
      <InputText name="description" callback={ handleChange } placename={ description } />
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
                  style={ { backgroundColor: theme.backgroundColor, color: theme.textColor }}
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
      <Checkbox onClick={ () => setOnlyOnce(!onlyOnce) } name="Only on this day" />
      <select onChange={({ target: { value } }) => {
          setDuration(value);
        }} style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}>
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
      <div className='row s-evenly'>
        <button onClick={ handleClick } style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}>
          <p>
            {
              rmBtn ? 'Update existing task' : 'Create new Task'
            }
          </p>
        </button>
        {
          rmBtn ? <button onClick={handleDelete} style={ {color: 'red'} }>Remove Existing task</button> : null
        }
      </div>
    </div>
  )
};

SetNewTask.propTypes = {};

SetNewTask.defaultProps = {};

export default SetNewTask;
