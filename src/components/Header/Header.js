import { useEffect } from 'react';
import Clock from '../Clock/Clock';
import Nav from '../Nav/Nav';

function App() {
  return (
    <header className="App-header row s-evenly">
      <h1 className="i-b">All in pocket</h1>
      <Clock />
      <Nav />
    </header>
  );
}

export default App;