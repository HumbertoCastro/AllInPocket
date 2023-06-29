import React, { useContext, useState } from 'react';
import TaskInformation from '../TaskInformation/TaskInformation';
import SetNewTask from '../SetNewTask/SetNewTask';
import pocketContext from '../../../context/pocketContext';


const HourlyCard = ({ task }) => {
  const [openInterface, setOpen] = useState(false);
  const {
    theme,
  } = useContext(pocketContext);
  const { time, hasTask, id, weak, color, taskId } = task;
  const duration = task.task.duration ? task.task.duration : 1;
  const hour = time.slice(0, 2);
  const minutos = time.slice(3, 5);

  const renderTask = () => (
    <div className="row time-card scale-in-center" style={ hasTask ? 
      { 
        height: duration * 12 + 'vh',
        backgroundColor: theme.primaryColor,
      } : {
        backgroundColor: theme.primaryColor,
      } }>
      <button className='row s-btw' onClick={ () => setOpen(true) } style={ hasTask ? 
        {
          backgroundColor: color,
          color: theme.textColor,
        } : {
          backgroundColor: theme.primaryColor,
          color: theme.textColor,
        } }>
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


  return (
    <>
      {
        openInterface ? <SetNewTask id={ { id, taskId } } weak={ weak } openInterface={ setOpen } /> : renderTask()
      }
    </>
  )
};

HourlyCard.propTypes = {};

HourlyCard.defaultProps = {};

export default HourlyCard;
