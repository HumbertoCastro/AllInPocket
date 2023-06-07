import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import TransactionCard from '../TransactionCard/TransactionCard';
import pocketContext from '../../../context/pocketContext';
import InputText from '../../Inputs/InputText/InputText';
import svgs from '../../../helpers/svg';

const MonthExpenses = ({ month, finances, callback }) => {
  const [name, setName] = useState('');
  console.log(month);

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
    if (name.length) {
      setExtypes([...exTypes, name]);
      setName('');
      localStorage.setItem('exTypes', JSON.stringify([...exTypes, name]));
    }
  }

  const deleteCategory = (category) => {
    console.log(exTypes.filter((x) => x !== category), category)
    setExtypes(exTypes.filter((x) => x !== category));
    localStorage.setItem('exTypes', JSON.stringify(exTypes.filter((x) => x !== category)));
  }

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
            <TransactionCard  array={ x } color="red" callback={ callback } finances={ finances } month={ month } isProfit={false} deleteCategory={deleteCategory} />
          )
        })
      }
    </div>
  )
}

MonthExpenses.propTypes = {};

MonthExpenses.defaultProps = {};

export default MonthExpenses;
