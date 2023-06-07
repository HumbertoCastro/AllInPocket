import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import '../finance.css'
import OverViewFinance from '../OverViewFinance/OverViewFinance';
import MonthExpenses from '../MonthExpenses/MonthExpenses';
import pocketContext from '../../../context/pocketContext';
import MonthProfit from '../MonthProfit/MonthProfit';
import AddTransaction from '../AddTransaction/AddTransaction';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const Finance = () => {
  const date = new Date();
  let month = monthNames[date.getMonth()];

  const {
    finances,
    setFinances,
  } = useContext(pocketContext);

  const [atualDisplay, setActualDisplay] = useState('expenses')
  const [useMonth, setUseMonth] = useState(month);

  const callbackChangeFinances = (newFinances, display) => {
    setUseFinances(newFinances);
    if (!display) {
      if (atualDisplay === 'expenses') {
        setDisplay(<MonthExpenses finances={ useFinances } month={ useMonth } callback={ callbackChangeFinances } />)
      } else if (atualDisplay === 'profit') {
        setDisplay(<MonthProfit finances={ useFinances } month={ useMonth } callback={ callbackChangeFinances } />)
      }
    } else {
      if (display === 'expenses') {
        setDisplay(<MonthExpenses finances={ useFinances } month={ useMonth } callback={ callbackChangeFinances } />)
      } else if (display === 'profit') {
        setDisplay(<MonthProfit finances={ useFinances } month={ useMonth } callback={ callbackChangeFinances } />)
      }
    }
  }

  const [display, setDisplay] = useState(<MonthExpenses finances={ finances } month={ useMonth } callback={ callbackChangeFinances } />);
  const [useFinances, setUseFinances] = useState(finances);

  const handleSelect = ({ target: { value } }) => {
    setUseMonth(value)
    if (atualDisplay === 'expenses') {
      setDisplay(<MonthExpenses finances={ useFinances } month={ value } callback={ callbackChangeFinances } />)
    } else if (atualDisplay === 'profit') {
      setDisplay(<MonthProfit finances={ useFinances } month={ value } callback={ callbackChangeFinances } />)
    }
  }

  const handleSelectTransactions = ({ target: { value }}) => {
    setActualDisplay(value);
    if (value === 'expenses') {
      setDisplay(<MonthExpenses finances={ useFinances } month={ useMonth } callback={ callbackChangeFinances } />)
    } else if (value === 'profit') {
      setDisplay(<MonthProfit finances={ useFinances } month={ useMonth } callback={ callbackChangeFinances } />)
    } 
  }

  return (
    <div>
      <select className='finance-select colunm' onChange={ handleSelect } value={ useMonth }>
        {
          monthNames.map((x) => (
            <option value={x}>{ x }</option>
          ))
        }
      </select>
      <OverViewFinance finances={ useFinances } month={ useMonth }/>
      <AddTransaction callback={ callbackChangeFinances }/>
      <select className='finance-select colunm' onChange={ handleSelectTransactions }>
        <option> expenses </option>
        <option> profit </option>
      </select>
      {
        display
      }
    </div>
  )
};

Finance.propTypes = {};

Finance.defaultProps = {};

export default Finance;
