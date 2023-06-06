import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import pocketContext from '../../../context/pocketContext';
import InputText from '../../Inputs/InputText/InputText';
import Checkbox from '../../Inputs/checkbox/Checkbox';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

const AddTransaction = ({ callback }) => {
  const [isProfit, setIsProfit] = useState(false);
  const [name, setName] = useState('Transaction');
  const [month, setMonth] = useState('May');
  const [type, setType] = useState('food');
  const [date, setDay] = useState(1);
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
      setType(value);
    }
  }

  const handleClick = () => {
    const newFinances = finances;
    console.log(type)
    !isProfit ? newFinances.find((x) => x.month === month).expenses.push({
      date,
      value,
      type,
      name,
    }) : newFinances.find((x) => x.month === month).profit.push({
      date,
      value,
      type,
      name,
    });
    callback(newFinances);
  }

  return(
    <div className='add-finance colunm s-btw'>
      <p>Add transaction</p>
      <div className='row s-evenly'>
        <Checkbox name="Profit" onClick={ () => {
          setIsProfit(true)
          setType('Salary');
        } } />
        <Checkbox name="Expenses" onClick={ () => {
          setIsProfit(false);
          setType('Food');
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
                exTypes.map((x) => (
                  <option value={x}>{ x }</option>
                ))
              ) : prTypes.map((x) => (
                <option value={x}>{ x }</option>
              ))
            }
          </select>
        </label>
      </div>
        <button onClick={ handleClick } >Add new Transaction</button>
    </div>
  )
};

AddTransaction.propTypes = {};

AddTransaction.defaultProps = {};

export default AddTransaction;
