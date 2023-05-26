import React from 'react';
import PropTypes from 'prop-types';
import TaskInformation from '../TaskInformation/TaskInformation';


const HourlyCard = ({ time, hasTask, callback, task, id, weak }) => {
  const duration = task.duration;
  const hour = time.slice(0, 2);
  const minutos = time.slice(3, 5);
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
      <button className='time-card' onClick={ () => callback(id, weak) } style={ {height: duration * 12 + 'vh'} }>
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
