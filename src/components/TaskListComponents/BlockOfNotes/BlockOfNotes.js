import React, { useContext, useState } from 'react';
import svgs from '../../../helpers/svg';
import '../task.css'
import pocketContext from '../../../context/pocketContext';


const BlockOfNotes = ({ id, notes, setNotes, setShow }) => {
  const [text, setText] = useState(notes.find((x) => x.id === id).content);
  
  const {
    theme,
  } = useContext(pocketContext);

  const handleChange = ({ target: { value } }) => {
    setText(value);
    notes.find((x) => x.id === id).content = value;
    setNotes(notes);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  return(
    <div className='block-note colunm'>
      <textarea onChange={ handleChange } value={ text } placeholder='Write your notes here'
      style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}>
      </textarea>
      <button className='rm-btn row' onClick={ () => setShow(false) } 
        style={ { color: theme.textColor, backgroundColor: theme.backgroundColor } }>
        {
          svgs.exit('500')
        }
      </button>
    </div>
  )
};

BlockOfNotes.propTypes = {};

BlockOfNotes.defaultProps = {};

export default BlockOfNotes;
