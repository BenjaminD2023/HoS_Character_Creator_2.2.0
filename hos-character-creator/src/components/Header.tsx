import { useCharacter } from '../context/CharacterContext';

export function Header() {
  const { character, resetCharacter } = useCharacter();

  return (
    <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">House of Shadows</h1>
            <span className="text-gray-400">Character Creator</span>
          </div>

          <div className="flex items-center gap-4">
            {character.name && (
              <div className="text-sm text-gray-400">
                <span className="text-gray-400">Current:</span>{' '}
                <span className="text-white font-bold">{character.name}</span>
                <span className="text-gray-600 mx-2">|</span>
                <span className="text-indigo-400">{character.class}</span>
              </div>
            )}
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all data?')) {
                  resetCharacter();
                }
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
