import React, { useEffect, useState } from 'react';

const OverViewFinance = ({ month, finances }) => {
  const totalExpenses = finances.filter((x) => x.month === month)[0].expenses.map((x) => x.value).reduce((x, sum) => x + sum, 0);
  const totalProfit = finances.filter((x) => x.month === month)[0].profit.map((x) => x.value).reduce((x, sum) => x + sum, 0);

  return (
    <div className='overview-finance'>
      <div>
        <p>
          Your balance
        </p>
        <h1>
          $ { totalProfit - totalExpenses }
        </h1>
        <div className='row s-btw prof-expen'>
          <p style={ { color: "green" } }>+${ totalProfit }</p>
          <p style={ { color: "red" } }>-${ totalExpenses }</p>
        </div>
      </div>
    </div>
  )
};

OverViewFinance.propTypes = {};

OverViewFinance.defaultProps = {};

export default OverViewFinance;
