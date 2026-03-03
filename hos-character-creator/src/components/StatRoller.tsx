import { useCharacter } from '../context/CharacterContext';

export function StatRoller() {
  const { character, rollStats, assignStat } = useCharacter();

  const getStatColor = (value: number) => {
    if (value >= 16) return 'text-green-500';
    if (value >= 12) return 'text-blue-500';
    if (value >= 10) return 'text-gray-400';
    return 'text-red-500';
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4">Attributes</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { key: 'str' as const, name: 'Strength', short: 'STR' },
          { key: 'int' as const, name: 'Intelligence', short: 'INT' },
          { key: 'ath' as const, name: 'Athletics', short: 'ATH' },
        ].map(stat => (
          <div key={stat.key} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">{stat.name}</div>
            <div className="flex items-center justify-between">
              <input
                type="number"
                value={character.stats[stat.key].value}
                onChange={(e) => assignStat(stat.key, parseInt(e.target.value) || 10)}
                className={`text-3xl font-bold w-20 bg-transparent text-center ${getStatColor(character.stats[stat.key].value)} focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded`}
                min="1"
                max="30"
              />
            </div>
            <div className="text-sm text-gray-500 mt-2 text-center">
              Modifier: <span className={getStatColor(character.stats[stat.key].modifier)}>
                {character.stats[stat.key].modifier >= 0 ? '+' : ''}{character.stats[stat.key].modifier}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={rollStats}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        Roll Stats (4d6 drop lowest)
      </button>

      {character.stats.str.value < 16 && character.stats.int.value < 16 && character.stats.ath.value < 16 && (
        <p className="text-yellow-500 text-sm mt-2 text-center">
          All stats below 16 - consider re-rolling!
        </p>
      )}
    </div>
  );
}
