import React from 'react';
import PropTypes from 'prop-types';
import TransactionCard from '../TransactionCard/TransactionCard';


const MonthProfit = ({ month, finances }) => {
  const date = new Date();
  const monthNumber = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
  const thisMonthProfit = finances.filter((x) => x.month === month)[0].profit.sort((a, b) => {
    return b.date - a.date
  });

  return (
    <div className='month-expenses'>
      <p>This Month Profits</p>
      {
        thisMonthProfit.map(({ date, name, type, value, color }) => {
          return (
            <TransactionCard  date={ date } name={ name } type={ type } value={ value } monthNumber={ monthNumber } color={ "green" } />
          )
        })
      }
    </div>
  )
}

MonthProfit.propTypes = {};

MonthProfit.defaultProps = {};

export default MonthProfit;
