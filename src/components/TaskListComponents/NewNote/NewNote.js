import React, { useState } from 'react';
import PropTypes from 'prop-types';
import svgs from '../../../helpers/svg';
import InputText from '../../Inputs/InputText/InputText';
import ColorsSelect from '../../Inputs/ColorsSelect/ColorsSelect';


const NewNote = ({ setNewNote, setNote, notes }) => {
  const [title, setTitle] = useState('New Note');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#C212D6');

  const handleChange = ({ target: { value, name } }) => {
    name === "title" ? setTitle(value) : setDescription(value);
  }

  const handleClick = () => {
    const noteObject = {
      title,
      description,
      color,
      id: notes.length + 1,
      content: '',
    }
    console.log(noteObject);
    setNote([...notes, noteObject])
    localStorage.setItem('notes', JSON.stringify([...notes, noteObject]));
    setNewNote(false);
  }

  return(
    <div className='new-note colunm s-btw'>
      <button onClick={ () => { setNewNote(false) }}>
        {
          svgs.exit()
        }
      </button>
      <InputText name="title" callback={ handleChange } placename="Task Title" />
      <InputText name="description" callback={ handleChange } placename="Task Description" />
      <label className='colunm s-evenly'>Choose the color for the task
       <ColorsSelect selectedColor={ color } callback={ setColor }/>
      </label>
      <button onClick={ handleClick }>
        Add new note
      </button>
    </div>
  )
};

NewNote.propTypes = {};

NewNote.defaultProps = {};

export default NewNote;