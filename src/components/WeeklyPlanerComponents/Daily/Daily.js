import React, { useContext, useEffect, useState } from 'react';
import HourlyCard from '../HourlyCard/HourlyCard';
import pocketContext from '../../../context/pocketContext';
import { useSwipeable } from 'react-swipeable';
import '../weekly.css'
import ReturnMinutes from '../../../helpers/Minutes';
import svgs from '../../../helpers/svg';
import SetNewTask from '../SetNewTask/SetNewTask';
import { dates } from '../../../helpers/GetAllDays';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getDayOfYear } from '../../../helpers/GetDayOfYear';
import { getDayArrayFromDate } from '../../../helpers/getDayArrayFromDate';

const today = new Date();
const settings = {
  infinite: true,
  slidesToShow: 4,
  swipeToSlide: true,
  centerMode: true,
  className: 'Slider',
  arrows: false,
  initialSlide: getDayOfYear(getDayArrayFromDate(today)),
};

const Daily = () => {
  const {
    tasks,
    theme,
  } = useContext(pocketContext);

  const times = ReturnMinutes;
  const [selected, setSelected] = useState(getDayArrayFromDate(today));
  const [openInterface, setOpen] = useState(false);

  useEffect(() => {
    console.log('ddd')
  }, tasks);

  const renderTheTasks = () => {
    const tasksToRender = tasks.filter(({ date }) => {
      if (date) {
        if (date[0] === selected[0] && date[1] === selected[1]) return true;
      } 
      return false;
    }).map((x) => <HourlyCard task={ x } />);
    if (tasksToRender.length > 0) {
      return tasksToRender;
    } return (<h1 className='no-task'>No tasks to be displayed</h1>)
  }

  const handleSwipeRight = () => {
    console.log('right', selected)
  }

  const handleSwipeLeft = () => {
    console.log('left');
  }

  const handlers = useSwipeable({
    onSwipedRight: handleSwipeLeft,
    onSwipedLeft: handleSwipeRight,
  });

  const renderMinutesDiv = () => {
    return times.map((x) => {
      const hour = x.slice(0, 2);
      const minutos = x.slice(3, 5);
      return (
        <div className="colunm side-times" style={ { color: theme.textColor } }>
          <p className='i-b n-margin'>
            {
              hour
            }
          </p>
          <div className='row s-btw line-div'>
            <p className=''>
              ..
            </p>
            <div className=''>

            </div>
          </div>
          <p className='i-b n-margin'>
            {
              minutos
            }
          </p>
        </div>
      )
    })
  }

  const renderDays = () => {
    let daysToBeDisplay = []
    dates.forEach(({ month, days}) => {
      const arrayOfDays = days.map((x) => 
      <div>
        <button
          className={`colunm days-selector ${selected[0] === month && selected[1] === x ? 'selected' : null}`}
          onClick={ () => {
            console.log(month, x);
            setSelected([month, x]);
          }}
          style={ { backgroundColor: theme.backgroundColor } }
          value={month}
        >
          <p>{month.substring(0,3)}</p>
          <h1 style={ { color: selected[0] === month && selected[1] === x ? '#73C0FC' : theme.textColor } }>{ x }</h1>
        </button>
      </div>);
      daysToBeDisplay.push(...arrayOfDays);      
    })
    return daysToBeDisplay;
  }

  return(
    <div>
      <div className='slick-div'>
        <Slider {...settings}>
          {
            renderDays()
          }
        </Slider>
      </div>
      <div className="colunm s-evenly" {...handlers}>
        <button className='add-task-btn row' onClick={ () => setOpen(!openInterface) } 
          style={ { color: theme.textColor, backgroundColor: theme.backgroundColor } }>
          {
            svgs.plus('500')
          }
        </button>
        <div className='all-times'>
          {
            renderMinutesDiv()
          }
          <div className='hidden'></div>
        </div>
        {
          openInterface ? <SetNewTask openInterface={ setOpen } altura={document.documentElement.scrollTop + (window.innerHeight / 100) * 15 } /> : null
        }
        {
          tasks ? renderTheTasks() : (<h1 className='no-task'>No tasks to be displayed</h1>)
        }
      </div>
    </div>
  )
};

Daily.propTypes = {};

Daily.defaultProps = {};

export default Daily;