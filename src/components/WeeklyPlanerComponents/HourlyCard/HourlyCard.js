import React from 'react';
import TaskInformation from '../TaskInformation/TaskInformation';


const HourlyCard = ({ callback, task }) => {
  const { time, hasTask, id, weak, color, taskId } = task;
  const duration = task.task.duration ? task.task.duration : 1;
  const hour = time.slice(0, 2);
  const minutos = time.slice(3, 5);

  return (
    <div className="row time-card slide-in-fwd-center" style={ hasTask ? 
      { 
        height: duration * 12 + 'vh',
        backgroundColor: color,
      } : {} }>
      <button className='row s-btw' onClick={ () => callback(id, weak, taskId) } style={ hasTask ? 
        {
          backgroundColor: color,
        } : {} }>
        <div className="colunm s-center times">
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
        {
          hasTask ? <TaskInformation task={ task } id={id} /> : <p className='task-inf add-task'>Add task</p>
        }
      </button>
    </div>
  )
};

HourlyCard.propTypes = {};

HourlyCard.defaultProps = {};

export default HourlyCard;
