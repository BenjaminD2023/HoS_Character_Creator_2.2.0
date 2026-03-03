import { useState } from 'react';
import { useCharacter } from '../context/CharacterContext';
import { getSkillsForClass } from '../data/skills';
import type { Skill } from '../types/character';

export function SkillManager() {
  const { character, addSkill, removeSkill, updateSkillUses } = useCharacter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<'All' | 'Basic' | 'Intermediate' | 'Advanced' | 'Capstone'>('All');

  const availableSkills = getSkillsForClass(character.class);
  const ownedSkillIds = character.skills.map(s => s.id);
  const purchasableSkills = availableSkills.filter(s => !ownedSkillIds.includes(s.id));

  const filteredSkills = purchasableSkills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === 'All' || skill.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const handleAddSkill = (skill: Skill) => {
    addSkill(skill);
    setShowAddModal(false);
    setSearchTerm('');
  };

  const handleUseSkill = (skill: Skill) => {
    if (skill.uses > 0) {
      updateSkillUses(skill.id, skill.uses - 1);
    }
  };

  const handleRestoreSkill = (skill: Skill) => {
    if (skill.uses < skill.maxUses) {
      updateSkillUses(skill.id, skill.uses + 1);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Basic': return 'bg-green-600';
      case 'Intermediate': return 'bg-blue-600';
      case 'Advanced': return 'bg-purple-600';
      case 'Capstone': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Skills</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Skill
        </button>
      </div>

      {/* Owned Skills */}
      <div className="space-y-4">
        {character.skills.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No skills yet. Click "Add Skill" to add abilities.
          </div>
        ) : (
          character.skills.map(skill => (
            <div key={skill.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getTierColor(skill.tier)} text-white`}>
                      {skill.tier}
                    </span>
                    <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                    <span className="text-xs text-gray-400">Lv.{skill.level}</span>
                  </div>
                  <p className="text-sm text-gray-300">{skill.description}</p>
                </div>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="text-red-500 hover:text-red-400 ml-2"
                  title="Remove skill"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Resource Slot Bar */}
              {skill.maxUses > 0 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>Uses Remaining</span>
                    <span className="text-white font-bold">{skill.uses} / {skill.maxUses}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRestoreSkill(skill)}
                      disabled={skill.uses >= skill.maxUses}
                      className="p-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Restore use"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="flex-1 h-6 bg-gray-700 rounded-lg overflow-hidden flex gap-1 p-0.5">
                      {Array.from({ length: skill.maxUses }).map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm transition-colors ${
                            i < skill.uses ? 'bg-green-500' : 'bg-gray-600'
                          }`}
                          onClick={() => {
                            if (i < skill.uses) {
                              handleUseSkill(skill);
                            }
                          }}
                          title={i < skill.uses ? 'Click to consume' : 'Not available'}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => handleUseSkill(skill)}
                      disabled={skill.uses <= 0}
                      className="p-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Consume use"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* XP Cost */}
              <div className="mt-2 text-xs text-gray-500">
                XP Cost: {skill.xpCost} | Tier: {skill.tier}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Add Skill for {character.class}</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-indigo-500 focus:outline-none"
              />
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value as any)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-indigo-500 focus:outline-none"
              >
                <option value="All">All Tiers</option>
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Capstone">Capstone</option>
              </select>
            </div>

            {/* Skill List */}
            <div className="flex-1 overflow-y-auto space-y-3">
              {filteredSkills.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No skills match your search.
                </div>
              ) : (
                filteredSkills.map(skill => (
                  <div
                    key={skill.id}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500 transition-colors cursor-pointer"
                    onClick={() => handleAddSkill(skill)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${getTierColor(skill.tier)} text-white`}>
                            {skill.tier}
                          </span>
                          <h4 className="text-lg font-bold text-white">{skill.name}</h4>
                        </div>
                        <p className="text-sm text-gray-300">{skill.description}</p>
                        {skill.prerequisites && skill.prerequisites.length > 0 && (
                          <p className="text-xs text-yellow-500 mt-2">
                            Requires: {skill.prerequisites.join(', ')}
                          </p>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-indigo-400 font-bold">{skill.xpCost} XP</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
