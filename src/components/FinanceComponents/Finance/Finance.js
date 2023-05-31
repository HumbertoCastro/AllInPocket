import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import '../finance.css'
import OverViewFinance from '../OverViewFinance/OverViewFinance';
import MonthExpenses from '../MonthExpenses/MonthExpenses';
import pocketContext from '../../../context/pocketContext';
import MonthProfit from '../MonthProfit/MonthProfit';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const Finance = () => {
  const date = new Date();
  const thisMonth = monthNames[date.getMonth()];

  const {
    finances,
  } = useContext(pocketContext);

  const [month, setMonth] = useState(thisMonth);
  const [display, setDisplay] = useState(<MonthExpenses finances={ finances } month={ month }/>);

  const handleSelect = ({ target: { value } }) => {
    setMonth(value);
  }

  const handleSelectTransactions = ({ target: { value }}) => {
    if (value === 'expenses') {
      setDisplay(<MonthExpenses finances={ finances } month={ month }/>)
    } else if (value === 'profit') {
      setDisplay(<MonthProfit finances={ finances } month={ month }/>)
    }
  }

  return (
    <div>
      <select className='finance-select colunm' onChange={ handleSelect } value={ month }>
        {
          monthNames.map((x) => (
            <option value={x}>{ x }</option>
          ))
        }
      </select>
      <OverViewFinance finances={ finances } month={ month }/>
      <select className='finance-select colunm' onChange={ handleSelectTransactions }>
        <option value="expenses"> expenses </option>
        <option value="profit"> profit </option>
        <option value="grapfhs"> grapfhs </option>
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
