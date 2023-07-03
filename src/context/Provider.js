import React, { useState } from 'react';
import PropTypes from 'prop-types';
import pocketContext from './pocketContext';
import ReturnMinutes from '../helpers/Minutes';
import yearFinance from '../helpers/mockFinance';
import Daily from '../components/WeeklyPlanerComponents/Daily/Daily';

const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
const types = ['Food', 'Delivery', 'Rent', 'Gym', 'Car insurence', 'Life insurence', 'Cleaning', 'Education', 
'Light', 'Water', 'Gas', 'Internet', 'Restaurants', 'Drug store', 'Self care', 'Medic', 'Dentist', 'Car', 'Travel', 'Present', 'Cloats'];
const ptypes = ['Salary' , 'Investiments', 'Sales', 'Others'];

const themes = {
  light: {
    backgroundColor: '#fff',
    textColor: '#000',
    primaryColor: '#fff',
    boxShadow: '0px 2px 2px 0px hsla(0,0%,0%,0.14), 0px 3px 1px -2px hsla(0,0%,0%,0.12), 0px 1px 5px 0px hsla(0,0%,0%,0.2);'
  },
  dark: {
    backgroundColor: '#121212',
    textColor: '#fff',
    primaryColor: '#1F1B24',
    boxShadow: '0px 2px 2px 0px white, 0px 3px 1px -2px hsla(0,0%,0%,0.12), 0px 1px 5px 0px hsla(0,0%,0%,0.2);'
  },
};

function Provider({ children }) {
  const weakArray = !localStorage.getItem('tasklist') ? weekday.map((day) => {
    const cardArray = ReturnMinutes.map((x, index) => {
      const objeto = {
        time: x,
        hasTask: false,
        overlap: false,
        task: {
          title: 'Task Title',
          description: 'Task description',
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
  const [page, setPage] = useState(<Daily />);
  const [exTypes, setExtypes] = useState(localStorage.getItem('exTypes') ? JSON.parse(localStorage.getItem('exTypes')) : types);
  const [prTypes, setPrtypes] = useState(localStorage.getItem('prTypes') ? JSON.parse(localStorage.getItem('prTypes')) : ptypes);
  const [tasks, setTasks] = useState(weakArray);
  const [interfaceNewTask, openInterface] = useState(false);
  const [nTasks, setNofTasks] = useState(0);
  const [notes, setNotes] = useState(notesList);
  const [finances, setFinances] = useState(localStorage.getItem('finances') ? JSON.parse(localStorage.getItem('finances')) : yearFinance);
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : themes.light);

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
    localStorage.setItem('theme', theme === themes.light ? JSON.stringify(themes.dark) : JSON.stringify(themes.light));
  };


  const contextValue = {
    prTypes,
    setPrtypes,
    exTypes,
    setExtypes,
    finances, 
    setFinances,
    notes,
    setNotes,
    page,
    setPage,
    tasks,
    setTasks,
    interfaceNewTask,
    openInterface,
    nTasks,
    setNofTasks,
    theme,
    setTheme,
    toggleTheme,
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
