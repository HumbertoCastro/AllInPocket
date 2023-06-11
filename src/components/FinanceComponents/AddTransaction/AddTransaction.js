import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import pocketContext from '../../../context/pocketContext';
import InputText from '../../Inputs/InputText/InputText';
import Checkbox from '../../Inputs/checkbox/Checkbox';
import svgs from '../../../helpers/svg';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

const AddTransaction = ({ callback, useMonth }) => {
  const dateCode = new Date();
  const [isProfit, setIsProfit] = useState(false);
  const [name, setName] = useState('Transaction');
  const [month, setMonth] = useState();
  const [type, setType] = useState(0);
  const [date, setDay] = useState(days[dateCode.getDay()]);
  const [value, setValue] = useState(0);

  const {
    finances,
    exTypes,
    prTypes,
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
    <div className='add-finance colunm s-btw'>
      <p>Add transaction</p>
      <div className='row s-evenly'>
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
        <InputText placename="name" callback={ ({ target: { value } }) => setName(value) }/>
        <div class="form">
          <input type='number' className='input' placeholder='Total value' onChange={({ target: { value } }) => {
            setValue(parseInt(value));
          }}/>
          <span class="input-border"></span>
        </div>
      </div>
      <div className='row s-evenly'>
      <label>
          Month
          <select name='month' className='finance-select colunm' onChange={ handleSelect } value={ month }>
          {
            monthNames.map((x) => (
              <option value={x}>{ x }</option>
            ))
          }
          </select>
        </label>
        <label>
          Day
          <select name='date' className='finance-select colunm' onChange={ handleSelect } value={ date }>
          {
            days.map((x) => (<option value={x}>{ x }</option>))
          }
          </select>
        </label>
        <label>
          Type
          <select name='type' className='finance-select colunm' onChange={ handleSelect } value={ type }>
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
        </label>
      </div>
        <button className='add-btn row' onClick={ handleClick } >
          <p>Add new Transaction</p>
          { svgs.plus() }
        </button>
    </div>
  )
};

AddTransaction.propTypes = {};

AddTransaction.defaultProps = {};

export default AddTransaction;
