import React, { useState } from 'react';
import svgs from '../../../helpers/svg';


const TransactionCard = ({ array, color }) => { 
  const [open, setOpen] = useState(false);
  const date = new Date();
  const monthNumber = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
  const name = Object.keys(array)[0]
  const total = array[name].map((x) => x.value).reduce((x, count) => x + count, 0);
  return (
    <div className='type-div'>
      <button className='tran-btn row s-btw' onClick={ () => setOpen(!open) }>
        <h1>
          {
            name
          }
        </h1>
        <div className='row'>
          <h1 style={ { color: `${ color }` } }>
            {
              "$ " + total
            }
          </h1>
          {
            svgs.dropdow()
          } 
        </div>       
      </button>
      {
        open ? (
          array[name].map(({ value, name, date }) => (
            <div className='expense-card row s-btw scale-in-left' style={ { borderBottom: `3px solid ${color}` } }>
              <div className='colunm'>
                <h1>
                  {
                    name
                  }
                </h1>
                <div className='row s-btw'>
                  <p>
                    {
                      `${monthNumber}/${date > 9 ? date : `0${date}`}`
                    }
                  </p>
                </div>
              </div>
              <p>
                $
                {
                  value
                }
              </p>
            </div>
          ))
        ) : null
      }
    </div>
  )
};

TransactionCard.propTypes = {};

TransactionCard.defaultProps = {};

export default TransactionCard;

/*
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
  */ 