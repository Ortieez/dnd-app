import { MagicItemInsert, MagicItem, APIMagicItem } from '../../../main/types';
import { magicItems } from '../../../db/schema';
import { database } from '../db';
import { eq } from 'drizzle-orm';

export const getMagicItems = async (): Promise<MagicItem[]> => {
    try {
        return database.select().from(magicItems);
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const getMagicItem = async (id: number): Promise<MagicItem[]> => {
    try {
        return database.select().from(magicItems).where(eq(magicItems.id, id));
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createMagicItem = async (newMagicItem: MagicItemInsert): Promise<MagicItem[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(magicItems).values(newMagicItem).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createManyMagicItems = async (newMagicItem: MagicItemInsert[]): Promise<MagicItem[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(magicItems).values(newMagicItem).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const updateMagicItem = async (id: number, updatedMagicItem: Partial<MagicItemInsert>): Promise<MagicItem[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.update(magicItems).set(updatedMagicItem).where(eq(magicItems.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const deleteMagicItem = async (id: number): Promise<MagicItem[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.delete(magicItems).where(eq(magicItems.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const parseMagicItemsFromAPI = (magicItems: APIMagicItem[]): MagicItemInsert[] => {
    return magicItems.map((magicItem: APIMagicItem): MagicItemInsert => {
        return {
            name: magicItem.name,
            desc: magicItem.desc,
            rarity: magicItem.rarity,
            requires_attunement: magicItem.requires_attunement,
            slug: magicItem.slug,
            type: magicItem.type,
        };
    });
}