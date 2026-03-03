import { useState } from 'react';
import { useCharacter } from '../context/CharacterContext';
import { Header } from './Header';
import { StatRoller } from './StatRoller';
import { ClassSelector } from './ClassSelector';
import { SkillManager } from './SkillManager';
import { CharacterCard } from './CharacterCard';

export function CharacterCreator() {
  const { character, setCharacterName } = useCharacter();
  const [activeTab, setActiveTab] = useState<'basics' | 'stats' | 'class' | 'skills' | 'card'>('basics');

  const tabs = [
    { id: 'basics' as const, label: 'Basics', icon: '[B]' },
    { id: 'stats' as const, label: 'Stats', icon: '[S]' },
    { id: 'class' as const, label: 'Class & XP', icon: '[C]' },
    { id: 'skills' as const, label: 'Skills', icon: '[K]' },
    { id: 'card' as const, label: 'Card', icon: '[D]' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - Creator */}
          <div className="flex-1 space-y-6">
            {/* Tabs */}
            <div className="flex overflow-x-auto bg-gray-900 rounded-lg p-1 border border-gray-700">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <span className="text-xs font-mono">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'basics' && (
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-2xl font-bold text-white mb-4">Basic Information</h2>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Character Name</label>
                    <input
                      type="text"
                      value={character.name}
                      onChange={(e) => setCharacterName(e.target.value)}
                      placeholder="Enter character name..."
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-indigo-500 focus:outline-none text-lg"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'stats' && <StatRoller />}

              {activeTab === 'class' && <ClassSelector />}

              {activeTab === 'skills' && <SkillManager />}

              {activeTab === 'card' && <CharacterCard />}
            </div>
          </div>

          {/* Right Panel - Mini Card Preview */}
          <div className="lg:w-96">
            <div className="sticky top-24">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-3">Quick Preview</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white font-bold">{character.name || '---'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Class:</span>
                    <span className="text-indigo-400">{character.class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">XP:</span>
                    <span className="text-white">{character.xp}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 mt-2">
                    <div className="text-gray-400 text-xs mb-1">Stats</div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-xs text-gray-400">STR</div>
                        <div className="text-white font-bold">{character.stats.str.value}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">INT</div>
                        <div className="text-white font-bold">{character.stats.int.value}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">ATH</div>
                        <div className="text-white font-bold">{character.stats.ath.value}</div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 pt-2 mt-2">
                    <div className="text-gray-400 text-xs mb-1">HP</div>
                    <div className="text-white font-bold">{character.hp} / {character.maxHp}</div>
                    <div className="w-full h-2 bg-gray-700 rounded-full mt-1 overflow-hidden">
                      <div
                        className={`h-full ${
                          character.hp / character.maxHp > 0.5 ? 'bg-green-500' :
                          character.hp / character.maxHp > 0.25 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(100, (character.hp / character.maxHp) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="border-t border-gray-700 pt-2 mt-2">
                    <div className="text-gray-400 text-xs mb-1">Skills</div>
                    <div className="text-white font-bold">{character.skills.length} acquired</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
