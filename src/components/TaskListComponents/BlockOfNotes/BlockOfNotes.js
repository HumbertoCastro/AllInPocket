import React, { useState } from 'react';
import svgs from '../../../helpers/svg';
import '../task.css'


const BlockOfNotes = ({ id, notes, setNotes, setShow }) => {
  const [text, setText] = useState(notes.find((x) => x.id === id).content);

  const handleChange = ({ target: { value } }) => {
    setText(value);
    notes.find((x) => x.id === id).content = value;
    setNotes(notes);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  return(
    <div className='block-note colunm'>
      <textarea onChange={ handleChange } value={ text } placeholder='Write your notes here'>
      </textarea>
      <div className='row blocks'>
        <button onClick={ () => { 
          console.log('d')
          setShow(false)
           }}>
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
