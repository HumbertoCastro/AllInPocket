import React, { useState } from 'react';
import svgs from '../../../helpers/svg';


const TransactionCard = ({ array, color, finances, callback, isProfit, month, deleteCategory }) => {
  const [open, setOpen] = useState(false);
  const date = new Date();
  const monthNumber = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
  const name = Object.keys(array)[0]
  const total = array[name].map((x) => x.value).reduce((x, count) => x + count, 0);
  const indexMonth = finances.indexOf(finances.find((x) => x.month === month));

  const handleDelete = () => {
    const newFinances = finances;
    if (isProfit) {
      newFinances[indexMonth].profit =  finances[indexMonth].profit.filter((y) => y.type !== name);
      callback(newFinances, 'profit')
    } else {
      newFinances[indexMonth].expenses =  finances[indexMonth].expenses.filter((y) => y.type !== name);
      callback(newFinances, 'expenses')
    }
    localStorage.setItem('finances', JSON.stringify(newFinances));
    deleteCategory(name);
  }

  const handleDeleteTransaction = (index) => {
    if (isProfit) {
      const newF = finances;
      let aux = 0;
      for (let i = 0; i < newF[indexMonth].profit.length; i += 1) {
        if (newF[indexMonth].profit[i].type === name) {
          if (aux === index) {
            aux = i;
            break;
          }
          aux++;
        }
      }
      newF[indexMonth].profit.splice(aux, 1);
      localStorage.setItem('finances', JSON.stringify(newF));
      callback(newF, 'profit');
    } else {
      const newF = finances;
      let aux = 0;
      for (let i = 0; i < newF[indexMonth].expenses.length; i += 1) {
        if (newF[indexMonth].expenses[i].type === name) {
          if (aux === index) {
            aux = i;
            break;
          }
          aux++;
        }
      }
      newF[indexMonth].expenses.splice(aux, 1);
      localStorage.setItem('finances', JSON.stringify(newF));
      callback(newF, 'expenses');
    }
  }
  return (
    <div className='type-div'>
      <div className='tran-btn row s-btw'>
        <button onClick={ handleDelete }>
          {
            svgs.exit()
          }
        </button>
        <button className='row s-btw in-btn' onClick={ () => setOpen(!open) }>
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
              array[name].length > 0 ? svgs.dropdow() : null
            } 
          </div>
        </button>
      </div>
      {
        open ? (
          array[name].map(({ value, name, date }, index) => (
            <div className='expense-card row s-btw scale-in-left' style={ { borderBottom: `3px solid ${color}` } }>
              <div className='colunm s-btw'>
                <h1>
                  {
                    name
                  }
                </h1>
                <button onClick={ () => { handleDeleteTransaction(index) } }>
                  {
                    svgs.exit()
                  }
                </button>
              </div>
              <div className='colunm delete s-btw'>
                <p>
                  $
                  {
                    value
                  }
                </p>
                <p>
                  {
                    `${monthNumber}/${date > 9 ? date : `0${date}`}`
                  }
                </p>
              </div>
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