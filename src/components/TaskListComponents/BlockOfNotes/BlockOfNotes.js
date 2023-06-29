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
      <div className='row blocks'>
        <button onClick={ () => { 
          console.log('d')
          setShow(false)
           }} style={ { backgroundColor: theme.backgroundColor, color: theme.textColor }}>
          {
            svgs.exit()
          }
        </button>
      </div>
    </div>
  )
};

BlockOfNotes.propTypes = {};

BlockOfNotes.defaultProps = {};

export default BlockOfNotes;
