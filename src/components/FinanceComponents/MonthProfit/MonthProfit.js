import React from 'react';
import PropTypes from 'prop-types';


const MonthProfit = ({ month, finances }) => {
  const date = new Date();
  const monthNumber = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
  const thisMonthProfit = finances.filter((x) => x.month === month)[0].profit;
  console.log(thisMonthProfit);

  return (
    <div className='month-expenses'>
      <p>This Month Expenses</p>
      {
        thisMonthProfit.map(({ date, name, type, value, color }) => {
          return (
            <div className='expense-card row s-btw' style={ { borderBottom: "3px solid green" } }>
              <div>
                <h1>
                  {
                    name
                  }
                </h1>
                <div className='row s-btw'>
                  <p>
                    {
                      type
                    }
                  </p>
                  <p>
                    {
                      `${monthNumber}/${date > 9 ? date : `0${date}`}`
                    }
                  </p>
                </div>
              </div>
              <p>
                -$
                {
                  value
                }
              </p>
            </div>
          )
        })
      }
    </div>
  )
}

MonthProfit.propTypes = {};

MonthProfit.defaultProps = {};

export default MonthProfit;
