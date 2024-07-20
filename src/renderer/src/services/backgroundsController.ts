import { BackgroundInsert, Background, APIBackground } from '../../../main/types';
import { backgrounds } from '../../../db/schema';
import { database } from '../db';
import { eq } from 'drizzle-orm';

export const getBackgrounds = async (): Promise<Background[]> => {
    try {
        return database.select().from(backgrounds);
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const getBackground = async (id: number): Promise<Background[]> => {
    try {
        return database.select().from(backgrounds).where(eq(backgrounds.id, id));
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createBackground = async (newBackground: BackgroundInsert): Promise<Background[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(backgrounds).values(newBackground).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createManyBackgrounds = async (newBackgrounds: BackgroundInsert[]): Promise<Background[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(backgrounds).values(newBackgrounds).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const updateBackground = async (id: number, updatedBackground: Partial<BackgroundInsert>): Promise<Background[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.update(backgrounds).set(updatedBackground).where(eq(backgrounds.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const deleteBackground = async (id: number): Promise<Background[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.delete(backgrounds).where(eq(backgrounds.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const parseBackgroundsFromAPI = (backgrounds: APIBackground[]): BackgroundInsert[] => {
    return backgrounds.map((background: APIBackground): BackgroundInsert => {
        return {
            desc: background.desc,
            equipment: background.equipment,
            feature: background.feature,
            feature_desc: background.feature_desc,
            name: background.name,
            slug: background.slug,
            suggested_characteristics: background.suggested_characteristics,
            languages: background.languages,
            skill_proficiencies: background.skill_proficiencies,
            tool_proficiencies: background.tool_proficiencies,
        };
    });
}