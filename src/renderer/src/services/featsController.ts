import { FeatInsert, Feat, APIFeat } from '../../../main/types';
import { feats } from '../../../db/schema';
import { database } from '../db';
import { eq } from 'drizzle-orm';

export const getFeats = async (): Promise<Feat[]> => {
    try {
        return database.select().from(feats);
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const getFeat = async (id: number): Promise<Feat[]> => {
    try {
        return database.select().from(feats).where(eq(feats.id, id));
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createFeat = async (newFeat: FeatInsert): Promise<Feat[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(feats).values(newFeat).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createManyFeats = async (newFeats: FeatInsert[]): Promise<Feat[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(feats).values(newFeats).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const updateFeat = async (id: number, updatedFeat: Partial<FeatInsert>): Promise<Feat[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.update(feats).set(updatedFeat).where(eq(feats.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const deleteFeat = async (id: number): Promise<Feat[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.delete(feats).where(eq(feats.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const parseFeatsFromAPI = (feats: APIFeat[]): FeatInsert[] => {
    return feats.map((feat: APIFeat): FeatInsert => {
        return {
            name: feat.name,
            desc: feat.desc,
            effects_desc: feat.effects_desc,
            prerequisite: feat.prerequisite,
            slug: feat.slug,
        };
    });
}