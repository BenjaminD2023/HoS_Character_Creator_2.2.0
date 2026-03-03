import type { ReactNode } from 'react';
import type { Character, CharacterClass, Skill } from '../types/character';
import { CLASS_DATA } from '../data/classes';
import { roll4d6DropLowest, getModifier } from '../types/character';
import { createContext, useContext, useState } from 'react';

interface CharacterContextType {
  character: Character;
  setCharacter: (char: Character) => void;
  updateCharacter: (updates: Partial<Character>) => void;
  rollStats: () => void;
  assignStat: (stat: 'str' | 'int' | 'ath', value: number) => void;
  setClass: (charClass: CharacterClass) => void;
  setCharacterName: (name: string) => void;
  setXP: (xp: number) => void;
  addSkill: (skill: Skill) => void;
  removeSkill: (skillId: string) => void;
  updateSkillUses: (skillId: string, uses: number) => void;
  calculateHP: () => void;
  resetCharacter: () => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [character, setCharacter] = useState<Character>({
    name: '',
    xp: 10,
    stats: {
      str: { value: 10, modifier: 0 },
      int: { value: 10, modifier: 0 },
      ath: { value: 10, modifier: 0 },
    },
    class: 'Fighter',
    hp: 0,
    maxHp: 0,
    hitDice: '1d10',
    charismaDice: 'd6',
    equipment: [],
    skills: [],
    spellSlots: undefined,
  });

  const updateCharacter = (updates: Partial<Character>) => {
    setCharacter(prev => ({ ...prev, ...updates }));
  };

  const rollStats = () => {
    const rolls = Array(3).fill(null).map(() => roll4d6DropLowest());
    if (rolls.every(r => r < 16)) {
      updateCharacter({
        stats: {
          str: { value: roll4d6DropLowest(), modifier: 0 },
          int: { value: roll4d6DropLowest(), modifier: 0 },
          ath: { value: roll4d6DropLowest(), modifier: 0 },
        },
      });
    } else {
      updateCharacter({
        stats: {
          str: { value: rolls[0], modifier: getModifier(rolls[0]) },
          int: { value: rolls[1], modifier: getModifier(rolls[1]) },
          ath: { value: rolls[2], modifier: getModifier(rolls[2]) },
        },
      });
    }
  };

  const assignStat = (stat: 'str' | 'int' | 'ath', value: number) => {
    setCharacter(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: { value, modifier: getModifier(value) },
      },
    }));
  };

  const setClass = (charClass: CharacterClass) => {
    const classData = CLASS_DATA[charClass];
    setCharacter(prev => ({
      ...prev,
      class: charClass,
      hitDice: classData.startingHp,
      charismaDice: classData.charismaDice,
      equipment: classData.startingEquipment,
      spellSlots: classData.spellSlots,
      skills: [],
    }));
    calculateHP();
  };

  const setCharacterName = (name: string) => {
    updateCharacter({ name });
  };

  const setXP = (xp: number) => {
    updateCharacter({ xp });
  };

  const addSkill = (skill: Skill) => {
    setCharacter(prev => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  };

  const removeSkill = (skillId: string) => {
    setCharacter(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== skillId),
    }));
  };

  const updateSkillUses = (skillId: string, uses: number) => {
    setCharacter(prev => ({
      ...prev,
      skills: prev.skills.map(s =>
        s.id === skillId ? { ...s, uses } : s
      ),
    }));
  };

  const calculateHP = () => {
    const classData = CLASS_DATA[character.class];
    const hitDiceStr = classData.startingHp;
    const [, sides] = hitDiceStr.split('d').map(Number);

    const baseHp = Math.floor(Math.random() * sides) + 1;

    let mod = 0;
    if (character.class === 'Fighter' || character.class === 'Priest') {
      mod = character.stats.str.modifier;
    } else {
      mod = character.stats.int.modifier;
    }

    const maxHp = Math.max(1, baseHp + mod);
    const hitDiceCount = 1 + Math.floor(character.xp / 3);
    const totalHp = maxHp * hitDiceCount;

    setCharacter(prev => ({
      ...prev,
      hp: totalHp,
      maxHp: totalHp,
    }));
  };

  const resetCharacter = () => {
    setCharacter({
      name: '',
      xp: 10,
      stats: {
        str: { value: 10, modifier: 0 },
        int: { value: 10, modifier: 0 },
        ath: { value: 10, modifier: 0 },
      },
      class: 'Fighter',
      hp: 0,
      maxHp: 0,
      hitDice: '1d10',
      charismaDice: 'd6',
      equipment: [],
      skills: [],
      spellSlots: undefined,
    });
  };

  return (
    <CharacterContext.Provider
      value={{
        character,
        setCharacter,
        updateCharacter,
        rollStats,
        assignStat,
        setClass,
        setCharacterName,
        setXP,
        addSkill,
        removeSkill,
        updateSkillUses,
        calculateHP,
        resetCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within CharacterProvider');
  }
  return context;
}
