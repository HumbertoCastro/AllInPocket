import './App.css';
import './Animations.css'
import { useContext } from 'react';
import Header from './components/HeaderComponents/Header/Header'
import pocketContext from './context/pocketContext';
import Nav from './components/HeaderComponents/Nav/Nav'

function App() {
  const {
    page
  } = useContext(pocketContext);

  const setMainContent = () =>{

  }

  return (
    <div className="App">
      <Header />
      {
        page
      }
      <Nav />
    </div>
  );
}

export default App;
