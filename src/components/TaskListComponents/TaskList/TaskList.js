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
    setNotes
  } = useContext(pocketContext);

  const renderTasks = () => (
    <div className='colunm' style={ { width: '100vw' }}>
        <button className='note-btn row s-evenly' onClick={() => { setNewNote(!newNote) }}>
        add note
          {
            svgs.note()
          }
        </button>
        <div className='row'>
          {
            notes.map(({ title, description, color, id }) => (
              <button style={ { backgroundColor: color } } className="note" onClick={ () => {
                setId(id)
                setShow(true)
              } }>
                <h1>{ title }</h1>
                <p>{ description }</p>
              </button>
            ))
          }
         </div> 
      </div>
  )

  return(
    <div className='row'>
      {
        showNote ? <BlockOfNotes id={ id } notes={ notes }/> :
        ( !newNote ? renderTasks() : <NewNote setNewNote={ setNewNote } setNote={ setNotes } notes={ notes } />)
      }
    </div>
  )
};

TaskList.propTypes = {};

TaskList.defaultProps = {};

export default TaskList;
