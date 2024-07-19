import { RaceInsert, Race, APIRace } from '../../../main/types';
import { races } from '../../../db/schema';
import { database } from '../db';
import { eq } from 'drizzle-orm';

export const getRaces = async (): Promise<Race[]> => {
    try {
        return database.select().from(races);
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const getRace = async (id: number): Promise<Race[]> => {
    try {
        return database.select().from(races).where(eq(races.id, id));
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createRace = async (newRace: RaceInsert): Promise<Race[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(races).values(newRace).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createManyRaces = async (newRace: RaceInsert[]): Promise<Race[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(races).values(newRace).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const updateRace = async (id: number, updatedRace: Partial<RaceInsert>): Promise<Race[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.update(races).set(updatedRace).where(eq(races.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const deleteRace = async (id: number): Promise<Race[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.delete(races).where(eq(races.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const parseRacesFromAPI = (races: APIRace[]): RaceInsert[] => {
    return races.map((race: APIRace): RaceInsert => {
        return {
            name: race.name,
            slug: race.slug,
            desc: race.desc,
            asi_desc: race.asi_desc,
            asi: race.asi,
            age: race.age,
            alignment: race.alignment,
            size: race.size,
            size_raw: race.size_raw,
            speed: race.speed,
            speed_desc: race.speed_desc,
            languages: race.languages,
            vision: race.vision,
            traits: race.traits,
            subraces: race.subraces
        };
    });
}