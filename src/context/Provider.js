import React, { useState } from 'react';
import PropTypes from 'prop-types';
import pocketContext from './pocketContext';
import Calendar from '../components/Calendar/Calendar';
import ReturnMinutes from '../helpers/Minutes';

function Provider({ children }) {
  const cardArray = ReturnMinutes.map((x, index) => {
    const objeto = {
      time: x,
      hasTask: false,
      task: {
        title: 'titulo',
        description: 'description',
      },
      id: index,
    }
    return objeto
  });
  const [page, setPage] = useState(<Calendar />);
  const [tasks, setTasks] = useState(cardArray);
  const [interfaceNewTask, openInterface] = useState(false);

  const contextValue = {
    page,
    setPage,
    tasks,
    setTasks,
    interfaceNewTask,
    openInterface,
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
