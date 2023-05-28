import React from 'react';
import PropTypes from 'prop-types';
import TaskInformation from '../TaskInformation/TaskInformation';


const HourlyCard = ({ callback, task }) => {
  const { time, hasTask, id, weak, color } = task;
  const duration = task.duration ? task.duration : 1;
  const hour = time.slice(0, 2);
  const minutos = time.slice(3, 5);
  console.log(task)
  return (
    <div className="row card-div">
      <div className="colunm s-center">
        <p className='i-b n-margin'>
          {
            hour
          }
        </p>
        <p className='i-b n-margin'>
          ..
        </p>
        <p className='i-b n-margin'>
          {
            minutos
          }
        </p>
      </div>
      <button className='time-card' onClick={ () => callback(id, weak) } style={ hasTask ? 
        { 
          height: duration * 12 + 'vh',
          backgroundColor: color,
        } : {} }>
        {
          hasTask ? <TaskInformation task={ task } /> : <p>adicionar tarefa</p>
        }
      </button>
    </div>
  )
};

HourlyCard.propTypes = {};

HourlyCard.defaultProps = {};

export default HourlyCard;
