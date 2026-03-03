import { useCharacter } from '../context/CharacterContext';
import { CLASS_DATA } from '../data/classes';
import type { CharacterClass } from '../types/character';

export function ClassSelector() {
  const { character, setClass, setXP, calculateHP } = useCharacter();

  const handleClassChange = (charClass: CharacterClass) => {
    setClass(charClass);
    calculateHP();
  };

  const handleXPChange = (xp: number) => {
    setXP(xp);
    calculateHP();
  };

  const classes: CharacterClass[] = ['Fighter', 'Archer', 'Wizard', 'Priest', 'Bard'];

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4">Class & XP</h2>

      {/* Class Selection */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Select Class</label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {classes.map(className => {
            const classData = CLASS_DATA[className];
            const isSelected = character.class === className;

            return (
              <button
                key={className}
                onClick={() => handleClassChange(className)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-900/30 text-white'
                    : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600'
                }`}
              >
                <div className="text-lg font-bold">{className}</div>
                <div className="text-xs text-gray-400 mt-1">
                  HP: {classData.startingHp}
                </div>
                <div className="text-xs text-gray-400">
                  Dice: {classData.charismaDice}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* XP Input */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Starting XP (5-10 recommended)</label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={character.xp}
            onChange={(e) => handleXPChange(parseInt(e.target.value) || 0)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-indigo-500 focus:outline-none w-32"
            min="0"
          />
          <div className="text-gray-400 text-sm">
            Hit Dice Count: <span className="text-white font-bold">{1 + Math.floor(character.xp / 3)}</span>
          </div>
        </div>
      </div>

      {/* Current Class Info */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h3 className="text-lg font-bold text-white mb-3">{character.class} Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-400">Recommended Stat:</div>
            <div className="text-white capitalize">
              {CLASS_DATA[character.class].recommendedStat}
            </div>
          </div>
          <div>
            <div className="text-gray-400">Starting HP:</div>
            <div className="text-white">{CLASS_DATA[character.class].startingHp}</div>
          </div>
          <div>
            <div className="text-gray-400">Charisma Dice:</div>
            <div className="text-white">{CLASS_DATA[character.class].charismaDice}</div>
          </div>
          <div>
            <div className="text-gray-400">Starting Skills:</div>
            <div className="text-white">
              {CLASS_DATA[character.class].startingSkills.join(', ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
