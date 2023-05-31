import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import '../finance.css'
import OverViewFinance from '../OverViewFinance/OverViewFinance';
import MonthExpenses from '../MonthExpenses/MonthExpenses';
import pocketContext from '../../../context/pocketContext';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const Finance = () => {
  const date = new Date();
  const thisMonth = monthNames[date.getMonth()];
  const [month, setMonth] = useState(thisMonth);

  const {
    finances,
  } = useContext(pocketContext);

  const handleSelect = ({ target: { value } }) => {
    setMonth(value);
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
      <MonthExpenses finances={ finances } month={ month }/>
    </div>
  )
};

Finance.propTypes = {};

Finance.defaultProps = {};

export default Finance;
