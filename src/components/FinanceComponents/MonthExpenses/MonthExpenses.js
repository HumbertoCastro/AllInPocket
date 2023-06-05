import React from 'react';
import PropTypes from 'prop-types';
import TransactionCard from '../TransactionCard/TransactionCard';


const MonthExpenses = ({ month, finances }) => {
  const date = new Date();
  const monthNumber = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
  const thisMonthExpenses = finances.filter((x) => x.month === month)[0].expenses.sort((a, b) => {
    return b.date - a.date
  });
  console.log(thisMonthExpenses);

  return (
    <div className='month-expenses'>
      <p>This Month Expenses</p>
      {
        thisMonthExpenses.map(({ date, name, type, value, color }) => {
          return (
            <TransactionCard  date={ date } name={ name } type={ type } value={ value } monthNumber={ monthNumber } color={ "red" } />
          )
        })
      }
    </div>
  )
}

MonthExpenses.propTypes = {};

MonthExpenses.defaultProps = {};

export default MonthExpenses;
