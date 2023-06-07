import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import pocketContext from './pocketContext';
import Calendar from '../components/Calendar/Calendar';
import ReturnMinutes from '../helpers/Minutes';
import yearFinance from '../helpers/mockFinance';

const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
const types = ['Food', 'Delivery', 'Rent', 'Gym', 'Car insurence', 'Life insurence', 'Cleaning', 'Education', 
'Light', 'Water', 'Gas', 'Internet', 'Restaurants', 'Drug store', 'Self care', 'Medic', 'Dentist', 'Car', 'Travel', 'Present', 'Cloats'];
const ptypes = ['Salary' , 'Investiments', 'Sales', 'Others'];

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
  const [exTypes, setExtypes] = useState(localStorage.getItem('exTypes') ? JSON.parse(localStorage.getItem('exTypes')) : types);
  const [prTypes, setPrtypes] = useState(localStorage.getItem('prTypes') ? JSON.parse(localStorage.getItem('prTypes')) : ptypes);
  const [tasks, setTasks] = useState(weakArray);
  const [interfaceNewTask, openInterface] = useState(false);
  const [nTasks, setNofTasks] = useState(0);
  const [notes, setNotes] = useState(notesList);
  const [pageName, setPageName] = useState('');
  const [finances, setFinances] = useState(localStorage.getItem('finances') ? JSON.parse(localStorage.getItem('finances')) : yearFinance);

  const contextValue = {
    prTypes,
    setPrtypes,
    exTypes,
    setExtypes,
    finances, 
    setFinances,
    pageName,
    setPageName,
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
