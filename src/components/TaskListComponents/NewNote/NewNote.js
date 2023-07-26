import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import svgs from '../../../helpers/svg';
import InputText from '../../Inputs/InputText/InputText';
import ColorsSelect from '../../Inputs/ColorsSelect/ColorsSelect';
import pocketContext from '../../../context/pocketContext';


const NewNote = ({ setNewNote, setNote, notes, task }) => {
  const [title, setTitle] = useState(task ? task.title : 'New Title');
  const [color, setColor] = useState(task ? task.color : '#C212D6');

  const {
    theme,
  } = useContext(pocketContext);

  const handleChange = ({ target: { value } }) => setTitle(value);

  const handleDelete = () => {
    setNote(notes.filter((x) => x.id !== task.id));
    localStorage.setItem('notes', JSON.stringify(notes.filter((x) => x.id !== task.id)));
    setNewNote(false)
  }

  const handleClick = () => {
    let id = 0;
    while (notes.some((x) => x.id === id)) {
      id ++;
    }
    const noteObject = {
      title,
      color,
      id,
      content: '',
    }
    if (task) {
      setNote(notes.map((x) => {
        if (x.id === task.id) {
          return noteObject;
        }
        return x
      }))
      localStorage.setItem('notes', JSON.stringify(notes.map((x) => {
        if (x.id === task.id) {
          return noteObject;
        }
        return x
      })));
    } else {
      setNote([...notes, noteObject])
      localStorage.setItem('notes', JSON.stringify([...notes, noteObject]));
    }
    setNewNote(false);
  }

  return(
    <div className='new-note scale-in-ver-top colunm s-btw' style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}>
      <button onClick={ () => { setNewNote(false) }} style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}>
        {
          svgs.exit()
        }
      </button>
      <InputText name="title" callback={ handleChange } placename={ task ? task.title : 'Task Title' } />
      <label className='colunm s-evenly'>Choose the color for the task
       <ColorsSelect selectedColor={ color } callback={ setColor }/>
      </label>
      <div className='string-btn' style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}>
        {
          task ? (
            <div className='row s-btw up-rm-div'>
              <div onClick={ handleClick }>
                <p>Update task</p>
              </div>
              <div style={ { color: 'red' } } className='rm-btn-task' onClick={ handleDelete }>Delete task</div>
            </div>
          ) : <div onClick={ handleClick } ><p>Add new Note {
            svgs.plusNote()
          }</p></div>
        }
      </div>
    </div>
  )
};

NewNote.propTypes = {};

NewNote.defaultProps = {};

export default NewNote;
