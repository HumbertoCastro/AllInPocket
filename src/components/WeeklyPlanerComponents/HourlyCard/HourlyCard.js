import React, { useContext, useState } from 'react';
import TaskInformation from '../TaskInformation/TaskInformation';
import SetNewTask from '../SetNewTask/SetNewTask';
import pocketContext from '../../../context/pocketContext';
import ReturnMinutesWithIncrements from '../../../helpers/MinutesWithIncrements';


const HourlyCard = ({ task }) => {
  const [openInterface, setOpen] = useState(false);
  const {
    theme,
  } = useContext(pocketContext);
  const { time, id, color } = task;
  const duration = task.duration;
  const altura = (ReturnMinutesWithIncrements.indexOf(time) * 2.5) + 17.5 + 'vh';

  const renderTask = () => (
    <div className="row time-card scale-in-center" style={{ 
        height: (duration * 2.5) + 'vh',
        backgroundColor: theme.primaryColor,
        top: altura,
      }}>
      <button className='row s-btw card' onClick={ () => setOpen(true) } style={{
          backgroundColor: color,
          color: theme.textColor,
        }}>
        <TaskInformation task={ task } id={id} />
      </button>
    </div>
  )


  return (
    <>
      {
        openInterface ? <SetNewTask id={ id } openInterface={ setOpen } altura={altura} /> : renderTask()
      }
    </>
  )
};

HourlyCard.propTypes = {};

HourlyCard.defaultProps = {};

export default HourlyCard;
