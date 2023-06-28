import './App.css';
import './Animations.css'
import { useContext } from 'react';
import Header from './components/HeaderComponents/Header/Header'
import pocketContext from './context/pocketContext';
import Nav from './components/HeaderComponents/Nav/Nav'
import Login from './components/LoginComponents/Login/Login';

function App() {
  const {
    page
  } = useContext(pocketContext);

  const MainContent = () => (
    <>
      <Header />
      {
        page
      }
      <Nav />
    </>
  )

  return (
    <div className="App">
      {
        !true ? <Login /> : (MainContent())
      }
    </div>
  );
}

export default App;
