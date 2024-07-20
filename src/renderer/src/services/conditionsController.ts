import { ConditionInsert, Condition, APICondition } from '../../../main/types';
import { conditions } from '../../../db/schema';
import { database } from '../db';
import { eq } from 'drizzle-orm';

export const getConditions = async (): Promise<Condition[]> => {
    try {
        return database.select().from(conditions);
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const getCondition = async (id: number): Promise<Condition[]> => {
    try {
        return database.select().from(conditions).where(eq(conditions.id, id));
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createCondition = async (newCondition: ConditionInsert): Promise<Condition[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(conditions).values(newCondition).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createManyConditions = async (newConditions: ConditionInsert[]): Promise<Condition[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(conditions).values(newConditions).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const updateCondition = async (id: number, updatedCondition: Partial<ConditionInsert>): Promise<Condition[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.update(conditions).set(updatedCondition).where(eq(conditions.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const deleteCondition = async (id: number): Promise<Condition[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.delete(conditions).where(eq(conditions.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const parseConditionsFromAPI = (conditions: APICondition[]): ConditionInsert[] => {
    return conditions.map((condition: APICondition): ConditionInsert => {
        return {
            name: condition.name,
            desc: condition.desc,
            slug: condition.slug,
        };
    });
}