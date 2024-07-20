import { ArmorInsert, Armor, APIArmor } from '../../../main/types';
import { armors } from '../../../db/schema';
import { database } from '../db';
import { eq } from 'drizzle-orm';

export const getArmors = async (): Promise<Armor[]> => {
    try {
        return database.select().from(armors);
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const getArmor = async (id: number): Promise<Armor[]> => {
    try {
        return database.select().from(armors).where(eq(armors.id, id));
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createArmor = async (newArmor: ArmorInsert): Promise<Armor[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(armors).values(newArmor).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createManyArmors = async (newArmors: ArmorInsert[]): Promise<Armor[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(armors).values(newArmors).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const updateArmor = async (id: number, updatedArmor: Partial<ArmorInsert>): Promise<Armor[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.update(armors).set(updatedArmor).where(eq(armors.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const deleteArmor = async (id: number): Promise<Armor[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.delete(armors).where(eq(armors.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const parseArmorsFromAPI = (armors: APIArmor[]): ArmorInsert[] => {
    return armors.map((armor: APIArmor): ArmorInsert => {
        return {
            ac_string: armor.ac_string,
            base_ac: armor.base_ac,
            category: armor.category,
            cost: armor.cost,
            name: armor.name,
            plus_con_mod: armor.plus_con_mod,
            plus_dex_mod: armor.plus_dex_mod,
            plus_flat_mod: armor.plus_flat_mod,
            plus_max: armor.plus_max,
            plus_wis_mod: armor.plus_wis_mod,
            slug: armor.slug,
            stealth_disadvantage: armor.stealth_disadvantage,
            weight: armor.weight,
            strength_requirement: armor.strength_requirement,
        };
    });
}