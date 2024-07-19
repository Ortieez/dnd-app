import { InferSelectModel, InferInsertModel } from "drizzle-orm"
import { armors, backgrounds, classes, conditions, feats, magicItems, monsters, packs, planes, races, sections, spelllists, spells, users, userSettings, weapons } from "../db/schema"

export interface Open5eRequest<RequestData> {
    count: number
    next: string | null
    previous: string | null
    results: RequestData[]
}

export enum PackType {
    Spell = "spell",
    SpellList = "spell_list",
    Monster = "monster",
    Background = "background",
    Plane = "plane",
    Section = "section",
    Feat = "feat",
    Condition = "condition",
    Race = "race",
    Class = "class",
    MagicItem = "magic_item",
    Weapon = "weapon",
    Armor = "armor"
}

export interface APISpell {
    slug: string
    name: string
    desc: string
    higher_level: string
    page: string
    range: string
    target_range_sort: number
    components: string
    requires_verbal_components: boolean
    requires_somatic_components: boolean
    requires_material_components: boolean
    material: string
    can_be_cast_as_ritual: boolean
    ritual: string
    duration: string
    concentration: string
    requires_concentration: boolean
    casting_time: string
    level: string
    level_int: number
    spell_level: number
    school: string
    dnd_class: string
    spell_lists: string[]
    archetype: string
    circles: string
    document__slug: string
    document__title: string
    document__license_url: string
    document__url: string
}

export interface APISpellList {
    class_slug: string
    class_name: string
    desc: string
    spells: string[]
    document__slug: string
    document__title: string
    document__license_url: string
    document__url: string
}

export interface APIMonster {
    slug: string
    desc: string
    name: string
    size: string
    type: string
    subtype: string
    group?: string
    alignment: string
    armor_class: number
    armor_desc?: string
    hit_points: number
    hit_dice: string
    speed: MonsterSpeed
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
    strength_save?: number
    dexterity_save?: number
    constitution_save?: number
    intelligence_save?: number
    wisdom_save?: number
    charisma_save?: number
    perception?: number
    skills: Skills
    damage_vulnerabilities: string
    damage_resistances: string
    damage_immunities: string
    condition_immunities: string
    senses: string
    languages: string
    challenge_rating: string
    cr: number
    actions: Action[]
    bonus_actions?: BonusAction[]
    reactions?: Reaction[]
    legendary_desc?: string
    legendary_actions?: LegendaryAction[]
    special_abilities: SpecialAbility[]
    spell_list: string[]
    page_no: number
    environments: string[]
    img_main?: string
}

export interface MonsterSpeed {
    swim?: number
    burrow?: number
    walk: number
    hover?: boolean
    fly?: number
    climb?: number
}

export interface Skills {
    athletics?: number
    perception?: number
    stealth?: number
    intimidation?: number
    history?: number
    deception?: number
    any?: number
    performance?: number
    persuasion?: number
    Deception?: number
    Perception?: number
    Performance?: number
    Persuasion?: number
    Stealth?: number
    medicine?: number
    religion?: number
    insight?: number
    survival?: number
    arcana?: number
    nature?: number
    acrobatics?: number
}

export interface Action {
    name: string
    desc?: string
    attack_bonus?: number
    damage_dice?: string
    damage_bonus?: number
    description?: string
}

export interface BonusAction {
    name: string
    desc: string
}

export interface Reaction {
    name: string
    desc: string
}

export interface LegendaryAction {
    name: string
    desc: string
}

export interface SpecialAbility {
    name: string
    desc?: string
    description?: string
}


export interface APIBackground {
    name: string
    desc: string
    slug: string
    skill_proficiencies?: string
    tool_proficiencies?: string
    languages?: string
    equipment: string
    feature: string
    feature_desc: string
    suggested_characteristics: string
}

export interface APIPlane {
    slug: string
    name: string
    desc: string
    parent?: string
}

export interface APISection {
    slug: string
    name: string
    desc: string
    parent: string
}

export interface APIFeat {
    slug: string
    name: string
    desc: string
    prerequisite?: string
    effects_desc: string[]
}

export interface APICondition {
    slug: string
    name: string
    desc: string
}

export interface APIRace {
    slug: string
    name: string
    desc: string
    asi_desc: string
    asi: AtributeScoreImprovement[]
    age: string
    alignment: string
    size: string
    size_raw: string
    speed: RaceSpeed
    speed_desc: string
    languages: string
    vision: string
    traits: string
    subraces: Subrace[]
}

export interface AtributeScoreImprovement {
    attributes: string[]
    value: number
}

export interface RaceSpeed {
    walk: number
}

export interface Subrace {
    name: string
    slug: string
    desc: string
    asi: AtributeScoreImprovement[]
    traits: string
    asi_desc: string
}

export interface APIClass {
    name: string
    slug: string
    desc: string
    hit_dice: string
    hp_at_1st_level: string
    hp_at_higher_levels: string
    prof_armor: string
    prof_weapons: string
    prof_tools: string
    prof_saving_throws: string
    prof_skills: string
    equipment: string
    table: string
    spellcasting_ability: string
    subtypes_name: string
    archetypes: Archetype[]
}

export interface Archetype {
    name: string
    slug: string
    desc: string
}

export interface APIMagicItem {
    slug: string
    name: string
    type: string
    desc: string
    rarity: string
    requires_attunement: string
}

export interface APIWeapon {
    name: string
    slug: string
    category: string
    cost: string
    damage_dice: string
    damage_type: string
    weight: string
    properties?: string[]
}

export interface APIArmor {
    name: string
    slug: string
    category: string
    base_ac: number
    plus_dex_mod: boolean
    plus_con_mod: boolean
    plus_wis_mod: boolean
    plus_flat_mod: number
    plus_max: number
    ac_string: string
    strength_requirement?: number
    cost: string
    weight: string
    stealth_disadvantage: boolean
}

export type User = InferSelectModel<typeof users>;
export type UserInsert = InferSelectModel<typeof users>;

export type UserSettings = InferSelectModel<typeof userSettings>;
export type UserSettingsInsert = InferInsertModel<typeof userSettings>;

export type Pack = InferSelectModel<typeof packs>;
export type PackInsert = InferInsertModel<typeof packs>;

export type Spell = InferSelectModel<typeof spells>;
export type SpellInsert = InferInsertModel<typeof spells>;

export type SpellList = InferSelectModel<typeof spelllists>;
export type SpellListInsert = InferInsertModel<typeof spelllists>;

export type Monster = InferSelectModel<typeof monsters>;
export type MonsterInsert = InferInsertModel<typeof monsters>;

export type Background = InferSelectModel<typeof backgrounds>;
export type BackgroundInsert = InferInsertModel<typeof backgrounds>;

export type Plane = InferSelectModel<typeof planes>;
export type PlaneInsert = InferInsertModel<typeof planes>;

export type Section = InferSelectModel<typeof sections>;
export type SectionInsert = InferInsertModel<typeof sections>;

export type Feat = InferSelectModel<typeof feats>;
export type FeatInsert = InferInsertModel<typeof feats>;

export type Condition = InferSelectModel<typeof conditions>;
export type ConditionInsert = InferInsertModel<typeof conditions>;

export type Race = InferSelectModel<typeof races>;
export type RaceInsert = InferInsertModel<typeof races>;

export type Class = InferSelectModel<typeof classes>;
export type ClassInsert = InferInsertModel<typeof classes>;

export type MagicItem = InferSelectModel<typeof magicItems>;
export type MagicItemInsert = InferInsertModel<typeof magicItems>;

export type Weapon = InferSelectModel<typeof weapons>;
export type WeaponInsert = InferInsertModel<typeof weapons>;

export type Armor = InferSelectModel<typeof armors>;
export type ArmorInsert = InferInsertModel<typeof armors>;