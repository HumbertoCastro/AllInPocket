import { useContext } from 'react';
import pocketContext from '../../../context/pocketContext';
import DarkLightModeSelector from '../../Inputs/DarkLightModeSelector/DarkLightModeSelector';

function App() {
  const {
    theme,
  } = useContext(pocketContext);
  return (
    <header className="App-header row s-btw">
      <h1 style={ { color: theme.textColor } }>All.Io</h1>
      <DarkLightModeSelector />
    </header>
  );
}

export default App;