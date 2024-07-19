import { MonsterInsert, Monster, APIMonster } from '../../../main/types';
import { monsters } from '../../../db/schema';
import { database } from '../db';
import { eq } from 'drizzle-orm';

export const getMonsters = async (): Promise<Monster[]> => {
    try {
        return database.select().from(monsters);
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const getMonster = async (id: number): Promise<Monster[]> => {
    try {
        return database.select().from(monsters).where(eq(monsters.id, id));
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createMonster = async (newMonster: MonsterInsert): Promise<Monster[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(monsters).values(newMonster).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createManyMonsters = async (newMonsters: MonsterInsert[]): Promise<Monster[]> => {
    try {
        return await database.transaction(async (trx) => {
            const chunks = newMonsters.reduce((resultArray: MonsterInsert[][], item, index) => {
                const chunkIndex = Math.floor(index / 500);

                if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = [];
                }

                resultArray[chunkIndex].push(item);

                return resultArray;
            }, []);

            const results: Monster[] = [];

            for (const chunk of chunks) {
                const result = await trx.insert(monsters).values(chunk).returning();

                results.push(...result);
            }

            return results;
        });
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const updateMonster = async (id: number, updatedMonster: Partial<MonsterInsert>): Promise<Monster[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.update(monsters).set(updatedMonster).where(eq(monsters.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const deleteMonster = async (id: number): Promise<Monster[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.delete(monsters).where(eq(monsters.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const parseMonstersFromAPI = (monsters: APIMonster[]): MonsterInsert[] => {
    return monsters.map((monster: APIMonster): MonsterInsert => {
        return {
            name: monster.name,
            slug: monster.slug,
            desc: monster.desc,
            size: monster.size,
            type: monster.type,
            subtype: monster.subtype,
            group: monster.group,
            alignment: monster.alignment,
            armor_class: monster.armor_class,
            armor_desc: monster.armor_desc,
            hit_points: monster.hit_points,
            hit_dice: monster.hit_dice,
            speed: monster.speed,
            strength: monster.strength,
            dexterity: monster.dexterity,
            constitution: monster.constitution,
            intelligence: monster.intelligence,
            wisdom: monster.wisdom,
            charisma: monster.charisma,
            strength_save: monster.strength_save,
            dexterity_save: monster.dexterity_save,
            constitution_save: monster.constitution_save,
            intelligence_save: monster.intelligence_save,
            wisdom_save: monster.wisdom_save,
            charisma_save: monster.charisma_save,
            perception: monster.perception,
            skills: monster.skills,
            damage_vulnerabilities: monster.damage_vulnerabilities,
            damage_resistances: monster.damage_resistances,
            damage_immunities: monster.damage_immunities,
            condition_immunities: monster.condition_immunities,
            senses: monster.senses,
            languages: monster.languages,
            challenge_rating: monster.challenge_rating,
            cr: monster.cr,
            actions: monster.actions,
            bonus_actions: monster.bonus_actions,
            reactions: monster.reactions,
            legendary_desc: monster.legendary_desc,
            legendary_actions: monster.legendary_actions,
            special_abilities: monster.special_abilities,
            spell_list: monster.spell_list,
            page_no: monster.page_no,
            environments: monster.environments,
        };
    });
}