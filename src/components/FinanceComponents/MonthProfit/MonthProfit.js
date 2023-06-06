import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import TransactionCard from '../TransactionCard/TransactionCard';
import pocketContext from '../../../context/pocketContext';
import InputText from '../../Inputs/InputText/InputText';
import svgs from '../../../helpers/svg';

const types = ['Salary' , 'Investiments', 'Sales', 'Others']

const MonthProfit = ({ month, finances }) => {
  const [name, setName] = useState('');
  console.log(month);
  const date = new Date();

  const {
    prTypes,
    setPrtypes,
  } = useContext(pocketContext);

  const newTypes = prTypes.map((tipo) => {
    return {
      [tipo]: [...finances.filter((x) => x.month === month)[0].profit.filter((x) => x.type === tipo)].sort((a, b) => {
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
    setPrtypes([...prTypes, name]);
  }

  console.log(newTypes);

  return (
    <div className='month-expenses'>
      <p>This Month Profits</p>
      <div className='row'>
        <InputText placename="set new category" callback={ handleChange }/>
        <button onClick={ handleClick }>{ svgs.plus() }</button>
      </div>
      {
        newTypes.map((x) => {
          return (
            <TransactionCard  array={ x } color="green" />
          )
        })
      }
    </div>
  )
}

MonthProfit.propTypes = {};

MonthProfit.defaultProps = {};

export default MonthProfit;
