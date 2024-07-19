import { WeaponInsert, Weapon, APIWeapon } from '../../../main/types';
import { weapons } from '../../../db/schema';
import { database } from '../db';
import { eq } from 'drizzle-orm';

export const getWeapons = async (): Promise<Weapon[]> => {
    try {
        return database.select().from(weapons);
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const getWeapon = async (id: number): Promise<Weapon[]> => {
    try {
        return database.select().from(weapons).where(eq(weapons.id, id));
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createWeapon = async (newWeapon: WeaponInsert): Promise<Weapon[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(weapons).values(newWeapon).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createManyWeapons = async (newWeapon: WeaponInsert[]): Promise<Weapon[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(weapons).values(newWeapon).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const updateWeapon = async (id: number, updatedWeapon: Partial<WeaponInsert>): Promise<Weapon[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.update(weapons).set(updatedWeapon).where(eq(weapons.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const deleteWeapon = async (id: number): Promise<Weapon[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.delete(weapons).where(eq(weapons.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const parseWeaponsFromAPI = (weapons: APIWeapon[]): WeaponInsert[] => {
    return weapons.map((weapon: APIWeapon): WeaponInsert => {
        return {
            name: weapon.name,
            cost: weapon.cost,
            weight: weapon.weight,
            slug: weapon.slug,
            properties: weapon.properties,
            category: weapon.category,
            damage_dice: weapon.damage_dice,
            damage_type: weapon.damage_type,
        }
    });
}