import React, { useEffect, useState } from 'react';

const OverViewFinance = ({ month, finances }) => {
  const totalExpenses = finances.filter((x) => x.month === month)[0].expenses.map((x) => x.value).reduce((x, sum) => x + sum, 0);
  const totalProfit = finances.filter((x) => x.month === month)[0].profit.map((x) => x.value).reduce((x, sum) => x + sum, 0);
  const total = totalProfit - totalExpenses;

  return (
    <div className='overview-finance colunm s-evenly'>
      <div>
        <p>
          Your balance
        </p>
        <h1 style={ total >= 0 ? { color: "green" } : { color: "red" } }>
          $ { total }
        </h1>
        <div className='row s-btw prof-expen'>
          <p style={ { color: "green" } }>total income +${ totalProfit }</p>
          <p style={ { color: "red" } }>total expenses -${ totalExpenses }</p>
        </div>
      </div>
    </div>
  )
};

OverViewFinance.propTypes = {};

OverViewFinance.defaultProps = {};

export default OverViewFinance;
