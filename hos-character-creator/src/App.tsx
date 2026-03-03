import { CharacterProvider } from './context/CharacterContext';
import { CharacterCreator } from './components/CharacterCreator';

function App() {
  return (
    <CharacterProvider>
      <CharacterCreator />
    </CharacterProvider>
  );
}

export default App;
