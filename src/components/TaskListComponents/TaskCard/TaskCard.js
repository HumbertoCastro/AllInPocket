import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import pocketContext from '../../../context/pocketContext';
import svgs from '../../../helpers/svg';
import NewNote from '../NewNote/NewNote';


const TaskCard = ({ title, color, id, setShow, setId }) => {
  const [showupdate, setShowupdate] = useState(false);
  const [task, setTask] = useState();
  const {
    theme,
    notes,
    setNotes
  } = useContext(pocketContext);

  const handleClick = () => {
    setTask(notes.find((x) => x.id === id));
    setShowupdate(true)
  }
  // <NewNote setNewNote={ setNewNote } setNote={ setNotes } notes={ notes } />
  return (
  <div className='row'>
    {
      showupdate ? <NewNote setNewNote={ setShowupdate } setNote={ setNotes } notes={ notes } task={task} /> :
      <div>
      <button style={ { backgroundColor: color } } className="note slit-in-vertical" onClick={ () => {
        setId(id)
        setShow(true)
      } }>
        <h1>{ title }</h1>
      </button>
      <div className='edit-btn' style={ { color: theme.textColor } } onClick={handleClick}>
        {
          svgs.edit()
        }
      </div>
      </div>
    }
  </div>
)};

TaskCard.propTypes = {};

TaskCard.defaultProps = {};

export default TaskCard;
