import './App.css';
import './Animations.css'
import { useContext, useEffect } from 'react';
import Header from './components/HeaderComponents/Header/Header'
import pocketContext from './context/pocketContext';
import Nav from './components/HeaderComponents/Nav/Nav'
import Login from './components/LoginComponents/Login/Login';

function App() {
  const {
    page,
    theme,
  } = useContext(pocketContext);

  useEffect(() => {
    document.querySelector('body').style.backgroundColor = theme.backgroundColor;
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    document.querySelector('body').style.width = w;
    document.querySelector('body').style.height = h;
  }, [])

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
    <div className="App" style={ { backgroundColor: theme.backgroundColor } }>
      {
        !true ? <Login /> : (MainContent())
      }
    </div>
  );
}

export default App;
