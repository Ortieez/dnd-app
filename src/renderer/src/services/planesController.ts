import { PlaneInsert, Plane, APIPlane } from '../../../main/types';
import { planes } from '../../../db/schema';
import { database } from '../db';
import { eq } from 'drizzle-orm';

export const getPlanes = async (): Promise<Plane[]> => {
    try {
        return database.select().from(planes);
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const getPlane = async (id: number): Promise<Plane[]> => {
    try {
        return database.select().from(planes).where(eq(planes.id, id));
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createPlane = async (newPlane: PlaneInsert): Promise<Plane[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(planes).values(newPlane).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createManyPlanes = async (newPlane: PlaneInsert[]): Promise<Plane[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(planes).values(newPlane).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const updatePlane = async (id: number, updatedPlane: Partial<PlaneInsert>): Promise<Plane[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.update(planes).set(updatedPlane).where(eq(planes.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const deletePlane = async (id: number): Promise<Plane[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.delete(planes).where(eq(planes.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const parsePlanesFromAPI = (planes: APIPlane[]): PlaneInsert[] => {
    return planes.map((plane: APIPlane): PlaneInsert => {
        return {
            name: plane.name,
            slug: plane.slug,
            desc: plane.desc,
            parent: plane.parent,
        };
    });
}