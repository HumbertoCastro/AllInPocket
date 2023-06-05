import React from 'react';
import PropTypes from 'prop-types';
import TransactionCard from '../TransactionCard/TransactionCard';


const AllTransactions = ({ month, finances }) => {
  const date = new Date();
  const monthNumber = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
  const thisMonthProfit = [...finances.filter((x) => x.month === month)[0].profit.map((x) => {
    x.isProfit = true;
    return x;
  }), ...finances.filter((x) => x.month === month)[0].expenses.map((x) => {
    x.isProfit = false;
    return x;
  })].sort((a, b) => {
    return b.date - a.date
  });
  console.log(thisMonthProfit);

  return (
    <div className='month-expenses'>
      <p>This Month Profits</p>
      {
        thisMonthProfit.map(({ date, name, type, value, color, isProfit }) => {
          if (isProfit) {
            return (
              <TransactionCard  date={ date } name={ name } type={ type } value={ value } monthNumber={ monthNumber } color={ "green" } />
            )
          } else {
            return (
              <TransactionCard  date={ date } name={ name } type={ type } value={ value } monthNumber={ monthNumber } color={ "red" } />
            )
          }
        })
      }
    </div>
  )
}

AllTransactions.propTypes = {};

AllTransactions.defaultProps = {};

export default AllTransactions;
