import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import TransactionCard from '../TransactionCard/TransactionCard';
import pocketContext from '../../../context/pocketContext';
import InputText from '../../Inputs/InputText/InputText';
import svgs from '../../../helpers/svg';

const MonthExpenses = ({ month, finances, callback }) => {
  const [name, setName] = useState('');

  const {
    exTypes,
    setExtypes,
    theme,
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
    setExtypes(exTypes.filter((x) => x !== category));
    localStorage.setItem('exTypes', JSON.stringify(exTypes.filter((x) => x !== category)));
  }

  return (
    <div className='month-expenses' >
      <div className='row'>
        <InputText placename="set new category" callback={ handleChange }/>
        <button className='add-finance-btn' onClick={ handleClick } style={ { backgroundColor: theme.backgroundColor, color: theme.textColor }}>{ svgs.plus() }</button>
      </div>
      {
        newTypes.sort((a,b) => {
          const varA = [...Object.values(a)[0]];
          const varB = [...Object.values(b)[0]];
          if (varA.length > 0 && varB.length === 0 ) {
            return -1;
          } else if (varA.length === 0 && varB.length > 0) {
            return 1;
          } else if (varA.length === 0 && varB.length === 0) {
            return 0;
          } else {
            if (varA.reduce((total, x) => x.value + total, 0) > varB.reduce((total, x) => x.value + total, 0)) {
              return -1;
            } else if (varA.reduce((total, x) => x.value + total, 0) < varB.reduce((total, x) => x.value + total, 0)) {
              return 1;
            } else {
              return 0;
            }
          }
        }).map((x) => {
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
