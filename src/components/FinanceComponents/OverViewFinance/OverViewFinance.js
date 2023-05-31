import React, { useEffect, useState } from 'react';

const OverViewFinance = ({ month, finances }) => {
  const total = finances.filter((x) => x.month === month)[0].transactions.map((x) => x.value).reduce((x, sum) => x + sum, 0);

  return (
    <div className='overview-finance'>
      <p>
        Your balance
      </p>
      <h1>
        $ { total }
      </h1>
    </div>
  )
};

OverViewFinance.propTypes = {};

OverViewFinance.defaultProps = {};

export default OverViewFinance;
