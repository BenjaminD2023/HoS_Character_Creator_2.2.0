import type { ClassData, CharacterClass } from '../types/character';

// House of Shadows 职业数据
export const CLASS_DATA: Record<CharacterClass, ClassData> = {
  Fighter: {
    name: 'Fighter',
    startingHp: '1d10',
    charismaDice: 'd6',
    startingEquipment: [
      { name: 'Longsword', damage: '1d8 + STR Modifier', type: 'weapon' },
      { name: 'Chain Mail', armor: 3, type: 'armor' },
      { name: 'Shield', armor: 2, type: 'shield' },
    ],
    recommendedStat: 'str',
    startingSkills: ['Ferocious Attack', 'Second Wind'],
  },
  Archer: {
    name: 'Archer',
    startingHp: '1d8',
    charismaDice: 'd6',
    startingEquipment: [
      { name: 'Longbow', damage: '1d6 + ATH modifier', type: 'weapon' },
      { name: 'Dagger', damage: '1d4 + ATH modifier', type: 'weapon' },
      { name: 'Leather Armor', armor: 2, type: 'armor' },
    ],
    recommendedStat: 'ath',
    startingSkills: ['Flexible Shots', 'Second Wind'],
  },
  Wizard: {
    name: 'Wizard',
    startingHp: '1d6',
    charismaDice: 'd10',
    startingEquipment: [
      { name: 'Staff', damage: '2', type: 'weapon' },
    ],
    recommendedStat: 'int',
    startingSkills: ['Magical ability', 'Arcane Recovery'],
    spellSlots: {
      level1: 5,
      level2: 4,
    },
  },
  Priest: {
    name: 'Priest',
    startingHp: '1d8',
    charismaDice: 'd8',
    startingEquipment: [
      { name: 'Mace', damage: '1d6 + STR modifier', type: 'weapon' },
      { name: 'Leather Armor', armor: 2, type: 'armor' },
      { name: 'Shield', armor: 2, type: 'shield' },
    ],
    recommendedStat: 'int',
    startingSkills: ['Lay on Hands'],
  },
  Bard: {
    name: 'Bard',
    startingHp: '1d6',
    charismaDice: 'd12',
    startingEquipment: [
      { name: 'Instrument', type: 'tool' },
      { name: 'Dagger', damage: '1d4 + ATH Modifier', type: 'weapon' },
      { name: 'Shortsword', damage: '1d6 + STR Modifier', type: 'weapon' },
      { name: 'Leather Armor', armor: 2, type: 'armor' },
    ],
    recommendedStat: 'int',
    startingSkills: ['Inspiration', 'Bardic School'],
  },
};
