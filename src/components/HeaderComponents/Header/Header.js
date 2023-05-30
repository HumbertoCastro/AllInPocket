import { useContext, useEffect } from 'react';
import Clock from '../Clock/Clock';
import pocketContext from '../../../context/pocketContext';

function App() {
  const {
    pageName,
  } = useContext(pocketContext);
  return (
    <header className="App-header row s-btw">
      <h1 className="i-b animate__backInRight">All.Io</h1>
      <p className='pagename'>{ pageName }</p>
    </header>
  );
}

export default App;