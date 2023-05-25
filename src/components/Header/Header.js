import { useEffect } from 'react';
import Clock from '../Clock/Clock';

function App() {
  return (
    <header className="App-header colunm s-evenly">
      <h1 className="i-b">All in pocket</h1>
      <Clock />
      <div className='line' />
    </header>
  );
}

export default App;