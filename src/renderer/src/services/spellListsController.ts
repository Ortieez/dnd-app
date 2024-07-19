import { SpellListInsert, SpellList, APISpellList } from '../../../main/types';
import { spelllists } from '../../../db/schema';
import { database } from '../db';
import { eq } from 'drizzle-orm';

export const getSpellListLists = async (): Promise<SpellList[]> => {
    try {
        return database.select().from(spelllists);
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const getSpellList = async (id: number): Promise<SpellList[]> => {
    try {
        return database.select().from(spelllists).where(eq(spelllists.id, id));
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createSpellList = async (newSpellList: SpellListInsert): Promise<SpellList[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(spelllists).values(newSpellList).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createManySpellLists = async (newSpellListLists: SpellListInsert[]): Promise<SpellList[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(spelllists).values(newSpellListLists).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const updateSpellList = async (id: number, updatedSpellList: Partial<SpellListInsert>): Promise<SpellList[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.update(spelllists).set(updatedSpellList).where(eq(spelllists.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const deleteSpellList = async (id: number): Promise<SpellList[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.delete(spelllists).where(eq(spelllists.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const parseSpellListsFromAPI = (spellLists: APISpellList[]): SpellListInsert[] => {
    return spellLists.map((spellList: APISpellList): SpellListInsert => {
        return {
            spells: spellList.spells,
            class_slug: spellList.slug,
            class_name: spellList.name,
            desc: spellList.desc,
        };
    });
}