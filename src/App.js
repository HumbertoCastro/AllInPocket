import './App.css';
import { useContext, useEffect } from 'react';
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav';
import pocketContext from './context/pocketContext';

function App() {
  const {
    page
  } = useContext(pocketContext);

  useEffect(() => {
    console.log(page)
  })

  const setMainContent = () =>{

  }

  return (
    <div className="App">
      <Header />
      <Nav />
      {
        page
      }
    </div>
  );
}

export default App;
