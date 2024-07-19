import { UserInsert, User } from '../../../main/types';
import { users } from '../../../db/schema';
import { database } from '../db';
import { eq } from 'drizzle-orm';

export const getUsers = async (): Promise<User[]> => {
    try {
        return database.select().from(users);
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const getUser = async (id: number): Promise<User[]> => {
    try {
        return database.select().from(users).where(eq(users.id, id));
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const createUser = async (newUser: UserInsert): Promise<User[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(users).values(newUser).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const updateUser = async (id: number, updatedUser: Partial<UserInsert>): Promise<User[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.update(users).set(updatedUser).where(eq(users.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const deleteUser = async (id: number): Promise<User[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.delete(users).where(eq(users.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
}