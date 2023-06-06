import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import TransactionCard from '../TransactionCard/TransactionCard';
import pocketContext from '../../../context/pocketContext';
import InputText from '../../Inputs/InputText/InputText';
import svgs from '../../../helpers/svg';

const MonthExpenses = ({ month, finances }) => {
  const [name, setName] = useState('');
  const {
    exTypes,
    setExtypes,
  } = useContext(pocketContext);

  const newTypes = exTypes.map((tipo) => {
    return {
      [tipo]: [...finances.filter((x) => x.month === month)[0].expenses.filter((x) => x.type === tipo)].sort((a, b) => {
        return b.date - a.date
      }),
    }
  })

  const handleChange = ({ target: { value } }) => {
    if (value.length > 0 ) {
      setName(value);
    }
  }

  const handleClick = () => {
    setName('');
    setExtypes([...exTypes, name]);
  }

  return (
    <div className='month-expenses'>
      <p>This Month Expenses</p>
      <div className='row'>
        <InputText placename="set new category" callback={ handleChange }/>
        <button onClick={ handleClick }>{ svgs.plus() }</button>
      </div>
      {
        newTypes.map((x) => {
          return (
            <TransactionCard  array={ x } color="red" />
          )
        })
      }
    </div>
  )
}

MonthExpenses.propTypes = {};

MonthExpenses.defaultProps = {};

export default MonthExpenses;
