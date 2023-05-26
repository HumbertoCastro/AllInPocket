import './App.css';
import { useContext } from 'react';
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav';
import pocketContext from './context/pocketContext';

function App() {
  const {
    page
  } = useContext(pocketContext);

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
