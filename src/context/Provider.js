import React, { useState } from 'react';
import PropTypes from 'prop-types';
import pocketContext from './pocketContext';
import Calendar from '../components/Calendar/Calendar';

function Provider({ children }) {
  const [page, setPage] = useState(<Calendar />);

  const contextValue = {
    page,
    setPage,
  };

  return (
    <pocketContext.Provider value={ contextValue }>
      {children}
    </pocketContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
