import React, { useContext, useEffect, useState } from 'react';
import pocketContext from '../../../context/pocketContext';

const OverViewFinance = ({ month }) => {
  const {
    finances,
  } = useContext(pocketContext);
  const totalExpenses = finances.filter((x) => x.month === month)[0].expenses.map((x) => x.value).reduce((x, sum) => x + sum, 0);
  const totalProfit = finances.filter((x) => x.month === month)[0].profit.map((x) => x.value).reduce((x, sum) => x + sum, 0);
  const total = totalProfit - totalExpenses;

  return (
    <div className='overview-finance colunm s-evenly scale-in-center'>
      <div className='sub-finance colunm s-evenly'>
        <div className='colunm s-evenly'>
          <p>
            Your balance
          </p>
          <h1 style={ total >= 0 ? { color: "green" } : { color: "red" } } className='overview-total'>
            $ { total }
          </h1>
        </div>
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
