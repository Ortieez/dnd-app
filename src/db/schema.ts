import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { Action, AtributeScoreImprovement, BonusAction, LegendaryAction, RaceSpeed, Reaction, Skills, SpecialAbility, MonsterSpeed, Subrace, Archetype } from "../main/types"

export const users = sqliteTable("user", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const userSettings = sqliteTable("userSettings", {
  id: integer("id").primaryKey(),
  theme: text("theme", { enum: ["light", "dark"] }).notNull(),
  language: text("language").notNull(),
  user_id: integer("user_id").notNull().references(() => users.id),
});

export const packs = sqliteTable("packs", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  downloaded: integer("downloaded", { mode: "boolean" }).default(false).notNull(),
  packType: text("packType").notNull(),
});

export const spells = sqliteTable("spells", {
  id: integer("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  desc: text("desc").notNull(),
  higher_level: text("higherLevel").notNull(),
  range_text: text("range_text").notNull(),
  range_number: integer("range_number").notNull(),
  verbal_required: integer("verbal_required", { mode: "boolean" }).notNull(),
  somatic_required: integer("somatic_required", { mode: "boolean" }).notNull(),
  material_required: integer("material_required", { mode: "boolean" }).notNull(),
  material: text("material").notNull(),
  can_be_cast_as_ritual: integer("can_be_cast_as_ritual", { mode: "boolean" }).notNull(),
  duration: text("duration").notNull(),
  requires_concentration: integer("requires_concentration", { mode: "boolean" }).notNull(),
  casting_time: text("casting_time").notNull(),
  level: text("level").notNull(),
  level_int: integer("level_int").notNull(),
  spell_level: integer("spell_level").notNull(),
  school: text("school").notNull(),
  dnd_class: text("dnd_class").notNull(),
  spell_lists: text('spell_lists', { mode: 'json' }).$type<string[]>().notNull(),
  archetype: text("archetype").notNull(),
  circles: text("circles").notNull(),
});

export const spelllists = sqliteTable("spelllists", {
  id: integer("id").primaryKey(),
  class_slug: text("class_slug").notNull().unique(),
  class_name: text("class_name").notNull(),
  desc: text("desc").notNull(),
  spells: text('spells', { mode: 'json' }).$type<string[]>().notNull(),
});

export const monsters = sqliteTable("monsters", {
  id: integer("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  desc: text("desc").notNull(),
  name: text("name").notNull(),
  size: text("size").notNull(),
  type: text("type").notNull(),
  subtype: text("subtype").notNull(),
  group: text("group"),
  alignment: text("alignment").notNull(),
  armor_class: integer("armor_class").notNull(),
  armor_desc: text("armor_desc"),
  hit_points: integer("hit_points").notNull(),
  hit_dice: text("hit_dice").notNull(),
  speed: text('speed', { mode: 'json' }).$type<MonsterSpeed>().notNull(),
  strength: integer("strength").notNull(),
  dexterity: integer("dexterity").notNull(),
  constitution: integer("constitution").notNull(),
  intelligence: integer("intelligence").notNull(),
  wisdom: integer("wisdom").notNull(),
  charisma: integer("charisma").notNull(),
  strength_save: integer("strength_save"),
  dexterity_save: integer("dexterity_save"),
  constitution_save: integer("constitution_save"),
  intelligence_save: integer("intelligence_save"),
  wisdom_save: integer("wisdom_save"),
  charisma_save: integer("charisma_save"),
  perception: integer("perception"),
  skills: text('skills', { mode: 'json' }).$type<Skills>().notNull(),
  damage_vulnerabilities: text("damage_vulnerabilities").notNull(),
  damage_resistances: text("damage_resistances").notNull(),
  damage_immunities: text("damage_immunities").notNull(),
  condition_immunities: text("condition_immunities").notNull(),
  senses: text("senses").notNull(),
  languages: text("languages").notNull(),
  challenge_rating: text("challenge_rating").notNull(),
  cr: integer("cr").notNull(),
  actions: text('actions', { mode: 'json' }).$type<Action[]>().notNull(),
  bonus_actions: text('bonus_actions', { mode: 'json' }).$type<BonusAction[]>(),
  reactions: text('reactions', { mode: 'json' }).$type<Reaction[]>(),
  legendary_desc: text("legendary_desc"),
  legendary_actions: text('legendary_actions', { mode: 'json' }).$type<LegendaryAction[]>(),
  special_abilities: text('special_abilities', { mode: 'json' }).$type<SpecialAbility[]>().notNull(),
  spell_list: text('spell_list', { mode: 'json' }).$type<string[]>().notNull(),
  page_no: integer("page_no").notNull(),
  environments: text('environments', { mode: 'json' }).$type<string[]>().notNull(),
});

export const backgrounds = sqliteTable("backgrounds", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  desc: text("desc").notNull(),
  slug: text("slug").notNull().unique(),
  skill_proficiencies: text("skill_proficiencies"),
  tool_proficiencies: text("tool_proficiencies"),
  languages: text("languages"),
  equipment: text("equipment").notNull(),
  feature: text("feature").notNull(),
  feature_desc: text("feature_desc").notNull(),
  suggested_characteristics: text("suggested_characteristics").notNull(),
});

export const planes = sqliteTable("planes", {
  id: integer("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  desc: text("desc").notNull(),
  parent: text("parent"),
});

export const sections = sqliteTable("sections", {
  id: integer("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  desc: text("desc").notNull(),
  parent: text("parent").notNull(),
});

export const feats = sqliteTable("feats", {
  id: integer("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  desc: text("desc").notNull(),
  prerequisite: text("prerequisite"),
  effects_desc: text('effects_desc', { mode: 'json' }).$type<string[]>().notNull(),
});

export const conditions = sqliteTable("conditions", {
  id: integer("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  desc: text("desc").notNull(),
});

export const races = sqliteTable("races", {
  id: integer("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  desc: text("desc").notNull(),
  asi_desc: text("asi_desc").notNull(),
  asi: text('asi', { mode: 'json' }).$type<AtributeScoreImprovement[]>().notNull(),
  age: text("age").notNull(),
  alignment: text("alignment").notNull(),
  size: text("size").notNull(),
  size_raw: text("size_raw").notNull(),
  speed: text('speed', { mode: 'json' }).$type<RaceSpeed>().notNull(),
  speed_desc: text("speed_desc").notNull(),
  languages: text("languages").notNull(),
  vision: text("vision").notNull(),
  traits: text("traits").notNull(),
  subraces: text('subraces', { mode: 'json' }).$type<Subrace[]>().notNull(),
});

export const classes = sqliteTable("classes", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  desc: text("desc").notNull(),
  hit_dice: text("hit_dice").notNull(),
  hp_at_1st_level: text("hp_at_1st_level").notNull(),
  hp_at_higher_levels: text("hp_at_higher_levels").notNull(),
  prof_armor: text("prof_armor").notNull(),
  prof_weapons: text("prof_weapons").notNull(),
  prof_tools: text("prof_tools").notNull(),
  prof_saving_throws: text("prof_saving_throws").notNull(),
  prof_skills: text("prof_skills").notNull(),
  equipment: text("equipment").notNull(),
  table: text("table").notNull(),
  spellcasting_ability: text("spellcasting_ability").notNull(),
  subtypes_name: text("subtypes_name").notNull(),
  archetypes: text('archetypes', { mode: 'json' }).$type<Archetype[]>().notNull(),
});

export const magicItems = sqliteTable("magicItems", {
  id: integer("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  desc: text("desc").notNull(),
  rarity: text("rarity").notNull(),
  requires_attunement: text("requires_attunement").notNull(),
});

export const weapons = sqliteTable("weapons", {
  id: integer("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  damage_dice: text("damage_dice").notNull(),
  damage_type: text("damage_type").notNull(),
  properties: text('properties', { mode: 'json' }).$type<Archetype[]>(),
  cost: text("cost").notNull(),
  weight: text("weight").notNull(),
});

export const armors = sqliteTable("armors", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  base_ac: integer("base_ac").notNull(),
  plus_dex_mod: integer("plus_dex_mod", { mode: "boolean" }).notNull(),
  plus_con_mod: integer("plus_con_mod", { mode: "boolean" }).notNull(),
  plus_wis_mod: integer("plus_wis_mod", { mode: "boolean" }).notNull(),
  plus_flat_mod: integer("plus_flat_mod").notNull(),
  plus_max: integer("plus_max").notNull(),
  ac_string: text("ac_string").notNull(),
  strength_requirement: integer("strength_requirement"),
  cost: text("cost").notNull(),
  weight: text("weight").notNull(),
  stealth_disadvantage: integer("stealth_disadvantage", { mode: "boolean" }).notNull(),
});