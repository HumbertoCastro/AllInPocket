import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import pocketContext from '../../../context/pocketContext';
import svgs from '../../../helpers/svg';
import NewNote from '../NewNote/NewNote';
import BlockOfNotes from '../BlockOfNotes/BlockOfNotes';


const TaskList = () => {
  const [newNote, setNewNote] = useState(false);
  const [showNote, setShow] = useState(false);
  const [id, setId] = useState(0);
  const {
    notes,
    setNotes,
    theme,
  } = useContext(pocketContext);

  const renderTasks = () => (
    <div className='colunm' style={ { width: '100vw' }}>
        <button className='note-btn row s-evenly' onClick={() => { setNewNote(!newNote) }}
        style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}>
        add note
          {
            svgs.note()
          }
        </button>
        <div className='row s-btw'>
          {
            notes.map(({ title, color, id }) => (
              <button style={ { backgroundColor: color } } className="note slit-in-vertical" onClick={ () => {
                setId(id)
                setShow(true)
              } }>
                <h1>{ title }</h1>
              </button>
            ))
          }
         </div> 
      </div>
  )

  return(
    <div className='row blocks scale-in-center'>
      {
        showNote ? <BlockOfNotes id={ id } notes={ notes } setNotes={setNotes} setShow={ setShow } /> :
        ( !newNote ? renderTasks() : <NewNote setNewNote={ setNewNote } setNote={ setNotes } notes={ notes } />)
      }
    </div>
  )
};

TaskList.propTypes = {};

TaskList.defaultProps = {};

export default TaskList;
