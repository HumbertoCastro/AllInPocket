import React from 'react';


const TransactionCard = ({ value, name, type, monthNumber, date, color }) => {
  return (
    <div className='expense-card row s-btw' style={ { borderBottom: `3px solid ${color}` } }>
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
};

TransactionCard.propTypes = {};

TransactionCard.defaultProps = {};

export default TransactionCard;
