import React, { useContext, useEffect, useState } from 'react';
import pocketContext from '../../../context/pocketContext';
import svgs from '../../../helpers/svg';
import ColorsSelect from '../../Inputs/ColorsSelect/ColorsSelect';
import InputText from '../../Inputs/InputText/InputText';
import ReturnMinutesFromZero from '../../../helpers/ReturnMinutesFromZero';
import { dates } from '../../../helpers/GetAllDays';
import ReturnMinutesWithIncrements from '../../../helpers/MinutesWithIncrements';
const Tempos = ReturnMinutesFromZero;

  const SetNewTask = ({ id, openInterface, altura }) => {
  const hj = new Date();

  const [title, setTitle] = useState('Task title');
  const [description, setDescription] = useState('Task description');
  const [duration, setDuration] = useState(1);
  const [color, setColor] = useState('#73C0FC');
  const [rmBtn, setRmBtn] = useState(false);
  const [date, setDate] = useState(`2023-${hj.getMonth() < 10 ? `0${hj.getMonth() + 1}` : hj.getMonth() + 1}-${hj.getDate() < 10 ? `0${hj.getDate()}` : hj.getDate()}`);
  const [time, setTime] = useState('06:00');

  const {
    tasks,
    setTasks,
    theme,
  } = useContext(pocketContext);

  useEffect(() => {
    console.log(date)
    if (id) {
    const currentTask = tasks.filter((x) => x.id === id)[0];
    console.log(currentTask, Object.values(currentTask)[2]);
    setTitle(currentTask.title);
    setDescription(currentTask.description);
    setDuration(currentTask.duration);
    setTime(currentTask.time);
    setColor(currentTask.color);
    setDate(returnDateFormat(currentTask.date));
    setRmBtn(true)
    } else {
      setDate(`2023-${hj.getMonth() < 10 ? `0${hj.getMonth() + 1}` : hj.getMonth() + 1}-${hj.getDate() < 10 ? `0${hj.getDate()}` : hj.getDate()}`)
    }
  }, [])

  const returnDateFormat = (taskDate) => {
    const mes = dates.indexOf(dates.find((x) => x.month === taskDate[0]));
    console.log(mes)
    return `2023-${mes < 10 ? `0${mes + 1}` : mes + 1}-${taskDate[1]}`
  }

  const handleChange = ({ target: { value, name } }) => {
    name === "title" ? setTitle(value) : setDescription(value);
  }

  const handleDelete = () => {
    console.log(id);
    setTasks(tasks.filter((x) => x.id !== id));
    openInterface(false)
    localStorage.setItem('tasklist', JSON.stringify(tasks.filter((x) => x.id !== id)));
  }

  const handleClick = () => {
    const mes = dates[parseInt(date.substring(5,7)) - 1].month;
    const dia = parseInt(date.substring(8,10))
    console.log([mes, dia])
    const newTasksArray = tasks ? tasks : [];
    const newTaskObject = {
      title,
      description,
      date: [mes, dia],
      color,
      duration,
      time,
      id: localStorage.getItem('alltimetasks') ? parseInt(localStorage.getItem('alltimetasks')) + 1 : 1,
    }
    if (id) {
      newTaskObject.id = id;
      setTasks(tasks.map((x) => x.id === id ? newTaskObject : x));
      localStorage.setItem('tasklist', JSON.stringify(newTasksArray));
    } else {
      setTasks([...newTasksArray, newTaskObject]);
      localStorage.setItem('tasklist', JSON.stringify([...newTasksArray, newTaskObject]));
      localStorage.setItem('alltimetasks', localStorage.getItem('alltimetasks') ? parseInt(localStorage.getItem('alltimetasks')) + 1 : 1);
    }
    setDuration(0);
    openInterface(false);
  }

  return(
    <div className="new-task colunm s-evenly scale-in-ver-top " style={ {
      backgroundColor: theme.primaryColor, color: theme.textColor, boxShadow: theme.boxShadow, top: altura }}>
      <button className='x-btn' onClick={() => {
        openInterface(false);
      }} style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}>
        {
          svgs.exit()
        }
      </button>
      <InputText name="title" callback={ handleChange } placename={ title } />
      <InputText name="description" callback={ handleChange } placename={ description } />
      <label>
        When:
        <input type='date' value={ date } className='date-input' onChange={({target: { value }}) => {
          setDate(value);
        }}/>
      </label>
      <select onChange={({ target: { value } }) => {
        console.log(value);
        setTime(value);
        }} style={ { backgroundColor: theme.primaryColor, color: theme.textColor }} value={time}>
        <option value="1">Set the time</option>
            {
              ReturnMinutesWithIncrements.map((x, index) => (
                <option value={ x } key={ `${index}-${x}` }>{ x }</option>
              ))
            }
      </select>
      <select onChange={({ target: { value } }) => {
        console.log(value)
        setDuration(value);
        }} style={ { backgroundColor: theme.primaryColor, color: theme.textColor }} value={duration}>
        <option value="1">How long will it last</option>
            {
              Tempos.slice(1).map((x, index) => (
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
