import React, { useContext, useState } from 'react';
import HourlyCard from '../HourlyCard/HourlyCard';
import pocketContext from '../../../context/pocketContext';
import { useSwipeable } from 'react-swipeable';
import '../weekly.css'

const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];


const Daily = () => {
  const {
    tasks,
    theme,
  } = useContext(pocketContext);

  const [selected, setSelected] = useState("Sun");
  const [onlyTasks, setOnly] = useState(false);

  const handleClick = ({ target: { name } }) => {
    setSelected(name);
  }

  const renderTheTasks = () => {
    const tasksToRender = onlyTasks ? tasks.filter(({ weak }) => weak === selected)[0].cardArray.filter((x) => !(x.overlap) && x.hasTask).map((task) => 
    (<HourlyCard task={ task } />)) :
    tasks.filter(({ weak }) => weak === selected)[0].cardArray.filter((x) => !(x.overlap)).map((task) => 
    (<HourlyCard task={ task } />));
    if (tasksToRender.length > 0) {
      return tasksToRender;
    } return (<h1 className='no-task'>No tasks to be displayed</h1>)
  }

  const handleSwipeRight = () => {
    console.log('right')
    if (weekday.indexOf(selected) !== weekday.length - 1) {
      setSelected(weekday[weekday.indexOf(selected) + 1]);
    }
  }

  const handleSwipeLeft = () => {
    console.log('left');
    if (weekday.indexOf(selected) !== 0) {
      setSelected(weekday[weekday.indexOf(selected) - 1]);
    }
  }

  const handlers = useSwipeable({
    onSwipedRight: handleSwipeLeft,
    onSwipedLeft: handleSwipeRight,
  });

  return(
    <div className="colunm s-evenly" {...handlers}>
      <div className='row s-evenly'>
        {
          weekday.map((day) => (
            <button
              name={ day }
              className={ selected === day ? "selected s-scale days scale-in-center" : "days scale-in-center" }
              onClick={ handleClick }
              style={ { backgroundColor: theme.backgroundColor, color: theme.textColor } }
            >
              {
                day
              }
            </button>
          ))
        }
      </div>
      <label class="cyberpunk-checkbox-label only-task" style={ { backgroundColor: theme.backgroundColor, color: theme.textColor } }>
      <input class="cyberpunk-checkbox" type="checkbox" onClick={ ({ target }) => {
        setOnly(!onlyTasks);
      } } style={ { backgroundColor: theme.backgroundColor, color: theme.textColor } }/>Show only tasks</label>
      {
        renderTheTasks()
      }
    </div>
  )
};

Daily.propTypes = {};

Daily.defaultProps = {};

export default Daily;