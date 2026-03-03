import express from 'express';
import cors from 'cors';
import { SKILL_DATA } from './src/data/skills';
import type { Skill } from './src/types/character';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// 根路径响应
app.get('/', (req, res) => {
  res.json({
    message: 'House of Shadows API',
    version: '1.0.0',
    endpoints: {
      skills: '/api/skills',
      skillsByClass: '/api/skills/class/:className',
      skillById: '/api/skills/:skillId',
      customSkill: '/api/skills/custom (POST)',
      characters: '/api/characters (POST)',
      characterById: '/api/characters/:characterId'
    }
  });
});

// 获取所有技能列表
app.get('/api/skills', (req, res) => {
  res.json(SKILL_DATA);
});

// 根据职业获取技能
app.get('/api/skills/class/:className', (req, res) => {
  const { className } = req.params;

  const classSkillsMap: Record<string, string[]> = {
    Fighter: [
      'ferocious_attack', 'second_wind', 'block', 'great_weapon_fighting',
      'enchanted_weapon', 'heroic_deed', 'rage', 'zephyrus_echo', 'indomitable'
    ],
    Archer: [
      'flexible_shots', 'dash', 'sneak_attack', 'enchanted_bow', 'covering_fire',
      'precision_attack', 'ambush', 'explosive_bounding', 'lightning_speed'
    ],
    Wizard: [
      'arcane_recovery', 'immersal_chaotic_metamagic', 'ophelias_bardic_magic',
      'concentration', 'control_time'
    ],
    Priest: [
      'lay_on_hands', 'clerical_order', 'quick_heal', 'divine_formation_i',
      'divine_formation_ii', 'holy_aura', 'divine_formation_iii', 'holy_light',
      'clerical_recovery'
    ],
    Bard: [
      'inspiration', 'expertise', 'professional_influencer', 'bardic_school',
      'loremaster', 'soothing_ballad', 'skalds_war_beat', 'martial_epic',
      'evasion', 'decoy'
    ],
  };

  const skillIds = classSkillsMap[className] || [];
  const skills = SKILL_DATA.filter(skill => skillIds.includes(skill.id));

  res.json(skills);
});

// 获取单个技能详情
app.get('/api/skills/:skillId', (req, res) => {
  const { skillId } = req.params;
  const skill = SKILL_DATA.find(s => s.id === skillId);

  if (!skill) {
    return res.status(404).json({ error: 'Skill not found' });
  }

  res.json(skill);
});

// 添加自定义技能（端口功能）
app.post('/api/skills/custom', (req, res) => {
  const customSkill: Skill = req.body;

  // 验证必填字段
  if (!customSkill.name || !customSkill.description || !customSkill.tier || !customSkill.xpCost) {
    return res.status(400).json({ error: 'Missing required fields: name, description, tier, xpCost' });
  }

  // 生成 ID
  customSkill.id = `custom_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  customSkill.level = customSkill.level || 1;
  customSkill.uses = customSkill.maxUses;

  // 添加到技能数据库
  SKILL_DATA.push(customSkill);

  res.status(201).json({
    message: 'Custom skill added successfully',
    skill: customSkill
  });
});

// 保存角色数据
app.post('/api/characters', (req, res) => {
  const character = req.body;

  // 在实际应用中，这里会保存到数据库
  console.log('Character saved:', character);

  res.status(201).json({
    message: 'Character saved successfully',
    characterId: `char_${Date.now()}`
  });
});

// 获取角色数据
app.get('/api/characters/:characterId', (req, res) => {
  // 在实际应用中，这里会从数据库读取
  const { characterId } = req.params;

  res.json({
    message: 'Character retrieved successfully',
    characterId
  });
});

app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
});
