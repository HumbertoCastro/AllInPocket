import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputText from '../../Inputs/InputText/InputText';
import svgs from '../../../helpers/svg';


const BlockOfNotes = ({ id, notes }) => {
  const [Allnotes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const thisNote = notes.find((x) => x.id === id);

  const handleChange = ({ target: { value } }) => {
    setText(value);
  }

  const handleClick = () => {
    setNotes([...Allnotes, text]);
  }

  return(
    <div className='block-note colunm'>
      <div className='row'>
        <InputText name="title" callback={ handleChange } placename="new note" />
        <button onClick={ handleClick }>
          {
            svgs.plus()
          }
        </button>
      </div>
      {
        Allnotes.map((x) => (
          <div>
            <h1>{ x }</h1>
          </div>
        ))
      }
    </div>
  )
};

BlockOfNotes.propTypes = {};

BlockOfNotes.defaultProps = {};

export default BlockOfNotes;
