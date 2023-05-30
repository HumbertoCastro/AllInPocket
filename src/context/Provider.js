import React, { useState } from 'react';
import PropTypes from 'prop-types';
import pocketContext from './pocketContext';
import Calendar from '../components/Calendar/Calendar';
import ReturnMinutes from '../helpers/Minutes';

const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];

function Provider({ children }) {
  const weakArray = !localStorage.getItem('tasklist') ? weekday.map((day) => {
    const cardArray = ReturnMinutes.map((x, index) => {
      const objeto = {
        time: x,
        hasTask: false,
        overlap: false,
        task: {
          title: 'titulo',
          description: 'description',
        },
        id: index,
        weak: day,
        taskId: 0,
        color: '#00000'
      }
      return objeto
    });
    return {
      cardArray,
      weak: day,
    };
  }) : JSON.parse(localStorage.getItem('tasklist'));
  const notesList = localStorage.getItem('notes') ?  JSON.parse(localStorage.getItem('notes')) : []
  const [page, setPage] = useState(<Calendar />);
  const [tasks, setTasks] = useState(weakArray);
  const [interfaceNewTask, openInterface] = useState(false);
  const [nTasks, setNofTasks] = useState(0);
  const [notes, setNotes] = useState(notesList);

  const contextValue = {
    notes,
    setNotes,
    page,
    setPage,
    tasks,
    setTasks,
    interfaceNewTask,
    openInterface,
    nTasks,
    setNofTasks
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
