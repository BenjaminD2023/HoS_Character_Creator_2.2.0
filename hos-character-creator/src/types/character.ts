// House of Shadows 角色数据类型定义

export interface Stat {
  value: number;
  modifier: number;
}

export interface Character {
  name: string;
  xp: number;
  stats: {
    str: Stat;
    int: Stat;
    ath: Stat;
  };
  class: CharacterClass;
  hp: number;
  maxHp: number;
  hitDice: string;
  charismaDice: string;
  equipment: Equipment[];
  skills: Skill[];
  spellSlots?: SpellSlots;
}

export type CharacterClass = 'Fighter' | 'Archer' | 'Wizard' | 'Priest' | 'Bard';

export interface Equipment {
  name: string;
  damage?: string;
  armor?: number;
  type?: 'weapon' | 'armor' | 'shield' | 'tool';
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  tier: 'Basic' | 'Intermediate' | 'Advanced' | 'Capstone';
  description: string;
  uses: number; // 当前剩余使用次数
  maxUses: number; // 最大使用次数
  xpCost: number;
  prerequisites?: string[];
}

export interface SpellSlots {
  level1: number;
  level2: number;
  level3?: number;
  level4?: number;
  level5?: number;
}

export interface ClassData {
  name: CharacterClass;
  startingHp: string;
  charismaDice: string;
  startingEquipment: Equipment[];
  recommendedStat: keyof Character['stats'];
  startingSkills: string[];
  spellSlots?: SpellSlots;
}

// 获取属性修正值
export function getModifier(value: number): number {
  if (value <= 1) return -5;
  if (value <= 3) return -4;
  if (value <= 5) return -3;
  if (value <= 7) return -2;
  if (value <= 9) return -1;
  if (value <= 11) return 0;
  if (value <= 13) return 1;
  if (value <= 15) return 2;
  if (value <= 17) return 3;
  if (value <= 19) return 4;
  if (value <= 21) return 5;
  if (value <= 23) return 6;
  if (value <= 25) return 7;
  if (value <= 27) return 8;
  if (value <= 29) return 9;
  return 10;
}

// 投掷 4d6 并保留最高三个
export function roll4d6DropLowest(): number {
  const rolls: number[] = [];
  for (let i = 0; i < 4; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }
  rolls.sort((a, b) => b - a);
  return rolls[0] + rolls[1] + rolls[2];
}
