import { PackInsert, Pack } from '../../../main/types';
import { packs } from '../../../db/schema';
import { database } from '../db';
import { eq } from 'drizzle-orm';

export const getPacks = async (): Promise<Pack[]> => {
    try {
        return database.select().from(packs);
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const getPack = async (id: number): Promise<Pack[]> => {
    try {
        return database.select().from(packs).where(eq(packs.id, id));
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const createPack = async (newPack: PackInsert): Promise<Pack[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(packs).values(newPack).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const updatePack = async (id: number, updatedPack: Partial<PackInsert>): Promise<Pack[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.update(packs).set(updatedPack).where(eq(packs.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const deletePack = async (id: number): Promise<Pack[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.delete(packs).where(eq(packs.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
}