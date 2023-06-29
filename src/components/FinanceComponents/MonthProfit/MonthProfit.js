import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import TransactionCard from '../TransactionCard/TransactionCard';
import pocketContext from '../../../context/pocketContext';
import InputText from '../../Inputs/InputText/InputText';
import svgs from '../../../helpers/svg';

const MonthProfit = ({ month, finances, callback }) => {
  const [name, setName] = useState('');
  console.log(month);

  const {
    prTypes,
    setPrtypes,
    theme,
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
    if (name.length) {
      setPrtypes([...prTypes, name]);
      setName('');
      localStorage.setItem('prTypes', JSON.stringify([...prTypes, name]));
    }
  }

  const deleteCategory = (category) => {
    console.log(prTypes.filter((x) => x !== category), category)
    setPrtypes(prTypes.filter((x) => x !== category));
    localStorage.setItem('prTypes', JSON.stringify(prTypes.filter((x) => x !== category)));
  }

  return (
    <div className='month-expenses'>
      <div className='row'>
        <InputText placename="set new category" callback={ handleChange }/>
        <button onClick={ handleClick } style={ { backgroundColor: theme.backgroundColor, color: theme.textColor }}>{ svgs.plus() }</button>
      </div>
      {
        newTypes.map((x) => {
          return (
            <TransactionCard  array={ x } color="green" callback={ callback } finances={ finances } month={ month } isProfit={true} deleteCategory={deleteCategory} />
          )
        })
      }
    </div>
  )
}

MonthProfit.propTypes = {};

MonthProfit.defaultProps = {};

export default MonthProfit;
