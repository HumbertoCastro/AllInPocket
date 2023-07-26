import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import pocketContext from '../../../context/pocketContext';
import svgs from '../../../helpers/svg';
import NewNote from '../NewNote/NewNote';
import BlockOfNotes from '../BlockOfNotes/BlockOfNotes';
import TaskCard from '../TaskCard/TaskCard';


const TaskList = () => {
  const [newNote, setNewNote] = useState(false);
  const [showNote, setShow] = useState(false);
  const [id, setId] = useState(0);
  const {
    notes,
    setNotes,
    theme,
  } = useContext(pocketContext);

  console.log(notes);

  const renderTasks = () => (
    <div className='colunm' style={ { width: '100vw' }}>
        <div className='row s-btw'>
          {
            notes.map(({ title, color, id }) => (
              <TaskCard id={id} title={title} color={color} setId={setId} setShow={setShow} />
            ))
          }
         </div> 
      </div>
  )

  return(
    <div className='row blocks scale-in-center'>
      {
        newNote && !showNote ? <NewNote setNewNote={ setNewNote } setNote={ setNotes } notes={ notes } /> : 
        showNote ? null : 
        <button className='note-btn row s-evenly' onClick={() => { setNewNote(!newNote) }}
        style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}>
        add note
          {
            svgs.note()
          }
        </button>
      }
      {
        showNote ? <BlockOfNotes id={ id } notes={ notes } setNotes={setNotes} setShow={ setShow } /> : renderTasks()
      }
      <div className='hidden'>
      </div>
    </div>
  )
};

TaskList.propTypes = {};

TaskList.defaultProps = {};

export default TaskList;
