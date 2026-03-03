import { useCharacter } from '../context/CharacterContext';

export function CharacterCard() {
  const { character } = useCharacter();

  const exportCharacterCard = () => {
    const cardData = `
╔══════════════════════════════════════════════════════════╗
║           HOUSE OF SHADOWS - CHARACTER CARD              ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  Name: ${character.name.padEnd(42)} ║
║  Class: ${character.class.padEnd(41)} ║
║  XP: ${character.xp.toString().padEnd(45)} ║
║                                                          ║
╠──────────────────────────────────────────────────────────╣
║  STATISTICS                                              ║
╠──────────────────────────────────────────────────────────╣
║                                                          ║
║  Strength (STR)   ${character.stats.str.value.toString().padStart(2)}  |  Modifier: ${character.stats.str.modifier >= 0 ? '+' : ''}${character.stats.str.modifier.toString().padEnd(3)} ║
║  Intelligence (INT) ${character.stats.int.value.toString().padStart(2)}  |  Modifier: ${character.stats.int.modifier >= 0 ? '+' : ''}${character.stats.int.modifier.toString().padEnd(3)} ║
║  Athletics (ATH)  ${character.stats.ath.value.toString().padStart(2)}  |  Modifier: ${character.stats.ath.modifier >= 0 ? '+' : ''}${character.stats.ath.modifier.toString().padEnd(3)} ║
║                                                          ║
╠──────────────────────────────────────────────────────────╣
║  HEALTH                                                  ║
╠──────────────────────────────────────────────────────────╣
║                                                          ║
║  HP: ${character.hp.toString().padEnd(3)} / ${character.maxHp.toString().padEnd(48)} ║
║  Hit Dice: ${character.hitDice.padEnd(46)} ║
║  Charisma Dice: ${character.charismaDice.padEnd(42)} ║
║                                                          ║
╠──────────────────────────────────────────────────────────╣
║  EQUIPMENT                                               ║
╠──────────────────────────────────────────────────────────╣
║                                                          ║
${character.equipment.map(e => `║  - ${e.name.padEnd(53)} ║`).join('\n')}
║                                                          ║
╠──────────────────────────────────────────────────────────╣
║  SKILLS                                                  ║
╠──────────────────────────────────────────────────────────╣
║                                                          ║
${character.skills.length === 0 ? '║  No skills acquired                                     ║' : character.skills.map(s =>
  `║  [${s.tier.charAt(0)}] ${s.name.padEnd(40)} Lv.${s.level}   ║\n${s.maxUses > 0 ? `║       Uses: ${s.uses}/${s.maxUses}${' '.repeat(43)} ║` : ''}`
).join('\n')}
║                                                          ║
${character.spellSlots ? `╠──────────────────────────────────────────────────────────╣
║  SPELL SLOTS                                             ║
╠──────────────────────────────────────────────────────────╣
║                                                          ║
║  Level 1: ${character.spellSlots.level1.toString().padEnd(48)} ║
║  Level 2: ${character.spellSlots.level2.toString().padEnd(48)} ║
${character.spellSlots.level3 !== undefined ? `║  Level 3: ${character.spellSlots.level3.toString().padEnd(48)} ║` : ''}
${character.spellSlots.level4 !== undefined ? `║  Level 4: ${character.spellSlots.level4.toString().padEnd(48)} ║` : ''}
${character.spellSlots.level5 !== undefined ? `║  Level 5: ${character.spellSlots.level5.toString().padEnd(48)} ║` : ''}
║                                                          ║` : ''}
╚══════════════════════════════════════════════════════════╝
    `.trim();

    const blob = new Blob([cardData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.name || 'character'}_card.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Character Card</h2>
        <button
          onClick={exportCharacterCard}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Export Card
        </button>
      </div>

      <div className="space-y-4">
        {/* Basic Info */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Name:</span>
              <span className="ml-2 text-white font-bold">{character.name || 'Not set'}</span>
            </div>
            <div>
              <span className="text-gray-400">Class:</span>
              <span className="ml-2 text-white font-bold">{character.class}</span>
            </div>
            <div>
              <span className="text-gray-400">XP:</span>
              <span className="ml-2 text-white font-bold">{character.xp}</span>
            </div>
            <div>
              <span className="text-gray-400">Hit Dice Count:</span>
              <span className="ml-2 text-white font-bold">{1 + Math.floor(character.xp / 3)}</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-3">Statistics</h3>
          <div className="space-y-2">
            {[
              { key: 'str', name: 'Strength (STR)' },
              { key: 'int', name: 'Intelligence (INT)' },
              { key: 'ath', name: 'Athletics (ATH)' },
            ].map(stat => (
              <div key={stat.key} className="flex items-center justify-between">
                <span className="text-gray-400">{stat.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-white font-bold text-xl">
                    {character.stats[stat.key as keyof typeof character.stats].value}
                  </span>
                  <span className={`px-2 py-1 rounded ${
                    character.stats[stat.key as keyof typeof character.stats].modifier >= 0
                      ? 'bg-green-900 text-green-400'
                      : 'bg-red-900 text-red-400'
                  }`}>
                    {character.stats[stat.key as keyof typeof character.stats].modifier >= 0 ? '+' : ''}
                    {character.stats[stat.key as keyof typeof character.stats].modifier}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-3">Health</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">HP:</span>
              <div className="flex items-center gap-3">
                <span className="text-white font-bold text-xl">
                  {character.hp} / {character.maxHp}
                </span>
                <div className="w-48 h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      character.hp / character.maxHp > 0.5 ? 'bg-green-500' :
                      character.hp / character.maxHp > 0.25 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(100, (character.hp / character.maxHp) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Hit Dice:</span>
              <span className="text-white">{character.hitDice}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Charisma Dice:</span>
              <span className="text-white">{character.charismaDice}</span>
            </div>
          </div>
        </div>

        {/* Equipment */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-3">Equipment</h3>
          {character.equipment.length === 0 ? (
            <p className="text-gray-500">No equipment</p>
          ) : (
            <div className="space-y-2">
              {character.equipment.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-white">{item.name}</span>
                  {item.damage && <span className="text-gray-400">{item.damage}</span>}
                  {item.armor !== undefined && <span className="text-blue-400">Armor: {item.armor}</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills with Resource Slots */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-3">Skills</h3>
          {character.skills.length === 0 ? (
            <p className="text-gray-500">No skills acquired</p>
          ) : (
            <div className="space-y-3">
              {character.skills.map(skill => (
                <div key={skill.id} className="border-b border-gray-700 pb-3 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          skill.tier === 'Basic' ? 'bg-green-600' :
                          skill.tier === 'Intermediate' ? 'bg-blue-600' :
                          skill.tier === 'Advanced' ? 'bg-purple-600' : 'bg-yellow-600'
                        } text-white`}>
                          {skill.tier.charAt(0)}
                        </span>
                        <span className="text-white font-bold">{skill.name}</span>
                        <span className="text-xs text-gray-400">Lv.{skill.level}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{skill.description}</p>
                    </div>
                  </div>

                  {/* Resource Slot Bar */}
                  {skill.maxUses > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>Uses Remaining</span>
                        <span className={`font-bold ${skill.uses === 0 ? 'text-red-400' : 'text-green-400'}`}>
                          {skill.uses} / {skill.maxUses}
                        </span>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: skill.maxUses }).map((_, i) => (
                          <div
                            key={i}
                            className={`flex-1 h-5 rounded-sm ${
                              i < skill.uses ? 'bg-green-500' : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Spell Slots */}
        {character.spellSlots && (
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-3">Spell Slots</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-gray-700 rounded">
                <div className="text-xs text-gray-400">Level 1</div>
                <div className="text-white font-bold">{character.spellSlots.level1}</div>
              </div>
              <div className="text-center p-2 bg-gray-700 rounded">
                <div className="text-xs text-gray-400">Level 2</div>
                <div className="text-white font-bold">{character.spellSlots.level2}</div>
              </div>
              {character.spellSlots.level3 !== undefined && (
                <div className="text-center p-2 bg-gray-700 rounded">
                  <div className="text-xs text-gray-400">Level 3</div>
                  <div className="text-white font-bold">{character.spellSlots.level3}</div>
                </div>
              )}
              {character.spellSlots.level4 !== undefined && (
                <div className="text-center p-2 bg-gray-700 rounded">
                  <div className="text-xs text-gray-400">Level 4</div>
                  <div className="text-white font-bold">{character.spellSlots.level4}</div>
                </div>
              )}
              {character.spellSlots.level5 !== undefined && (
                <div className="text-center p-2 bg-gray-700 rounded">
                  <div className="text-xs text-gray-400">Level 5</div>
                  <div className="text-white font-bold">{character.spellSlots.level5}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
