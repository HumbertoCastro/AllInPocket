import React, { useContext, useEffect, useState, useSyncExternalStore } from 'react';
import PropTypes from 'prop-types';
import pocketContext from '../../../context/pocketContext';
import InputText from '../../Inputs/InputText/InputText';
import Checkbox from '../../Inputs/checkbox/Checkbox';
import svgs from '../../../helpers/svg';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const days = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

const AddTransaction = ({ callback, useMonth }) => {
  const dateCode = new Date();
  console.log(dateCode.getDate())
  const [isProfit, setIsProfit] = useState(false);
  const [name, setName] = useState('Transaction');
  const [month, setMonth] = useState();
  const [type, setType] = useState(0);
  const [date, setDay] = useState(days[dateCode.getDate()]);
  const [value, setValue] = useState(0);
  const [svg, setSvg] = useState(svgs.plus());
  const [empty, setEmpty] = useState(false);

  const {
    finances,
    exTypes,
    prTypes,
    theme,
  } = useContext(pocketContext);

  const handleSelect = ({ target: { value, name } }) => {
    if (name === "month") {
      setMonth(value);
    } else if ( name === "date") {
      setDay(value);
    } else {
      setType(parseInt(value));
    }
  }

  useEffect(() => {
    setMonth(useMonth);
  }, [useMonth]);

  const handleClick = () => {
    const newFinances = finances;
    console.log(prTypes[type], type);
    if ((isProfit && prTypes.length !== 0) || (!isProfit && exTypes.length !== 0 )) {
      !isProfit ? newFinances.find((x) => x.month === month).expenses.push({
        date,
        value,
        type: exTypes.length === 1 ? exTypes[0] : exTypes[type],
        name,
      }) : newFinances.find((x) => x.month === month).profit.push({
        date,
        value,
        type: prTypes.length === 1 ? prTypes[0] : prTypes[type],
        name,
      });
      localStorage.setItem('finances', JSON.stringify(newFinances));
      callback(newFinances);      
    }
  }

  return(
    <div className='add-finance colunm s-btw scale-in-center' style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}>
      <div className='add row s-evenly'>
        <p>Add a transaction</p>
        <Checkbox name="Profit" onClick={ () => {
          setIsProfit(true)
          setType(0);
        } } />
        <Checkbox name="Expenses" onClick={ () => {
          setIsProfit(false);
          setType(0);
        } } />
      </div>
      <div className='row s-evenly'>
        <InputText placename="Description" callback={ ({ target: { value } }) => setName(value) }/>
        <div class="form">
          <input type='number' className='input' placeholder='How much ?' onChange={({ target: { value } }) => {
            setValue(parseInt(value));
          }} style={ { color: theme.textColor }}/>
          <span class="input-border"></span>
        </div>
      </div>
      <div className='row add'>
        <p>Date:</p>
      <label>
          Month
          <select name='month' className='finance-select-plus colunm' onChange={ handleSelect } value={ month }
          style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}>
          {
            monthNames.map((x) => (
              <option value={x}>{ x }</option>
            ))
          }
          </select>
        </label>
        <label>
          Day
          <select name='date' className='finance-select colunm day' onChange={ handleSelect } value={ date }
          style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}>
          {
            days.map((x) => (<option value={x}>{ x }</option>))
          }
          </select>
        </label>
      </div>
      <div className='add row'>
        <p>Type: </p>
        <select name='type' className='finance-select colunm type' onChange={ handleSelect } value={ type }
        style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}>
          {
            !isProfit ? (
              exTypes.map((x, index) => (
                <option value={index}>{ x }</option>
              ))
            ) : prTypes.map((x, index) => (
              <option value={index}>{ x }</option>
            ))
          }
        </select>
      </div>
        <button className='string-btn add-btn row' onClick={ () => {
          if (value > 0) {
            setTimeout(() => {
              setSvg(svgs.plus());
            }, 1000);
            setSvg(svgs.checkmark());
            handleClick();
            setEmpty(false);
          } else {
            setEmpty(true);
          }
        } } style={ { backgroundColor: theme.primaryColor, color: theme.textColor }}>
          <p>Add new Transaction</p>
          { svg }
        </button>
        {
          empty ? <p className='scale-in-center' style={ { color: 'red' } }>Please provide a Value for the transaction</p> : null
        }
    </div>
  )
};

AddTransaction.propTypes = {};

AddTransaction.defaultProps = {};

export default AddTransaction;
