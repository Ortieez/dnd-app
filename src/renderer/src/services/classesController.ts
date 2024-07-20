import { ClassInsert, Class, APIClass } from '../../../main/types';
import { classes } from '../../../db/schema';
import { database } from '../db';
import { eq } from 'drizzle-orm';

export const getClasses = async (): Promise<Class[]> => {
    try {
        return database.select().from(classes);
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const getClass = async (id: number): Promise<Class[]> => {
    try {
        return database.select().from(classes).where(eq(classes.id, id));
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createClass = async (newClass: ClassInsert): Promise<Class[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(classes).values(newClass).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createManyClasses = async (newClasses: ClassInsert[]): Promise<Class[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(classes).values(newClasses).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const updateClass = async (id: number, updatedClass: Partial<ClassInsert>): Promise<Class[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.update(classes).set(updatedClass).where(eq(classes.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const deleteClass = async (id: number): Promise<Class[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.delete(classes).where(eq(classes.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const parseClassesFromAPI = (classes: APIClass[]): ClassInsert[] => {
    return classes.map((dndclass: APIClass): ClassInsert => {
        return {
            name: dndclass.name,
            desc: dndclass.desc,
            slug: dndclass.slug,
            archetypes: dndclass.archetypes,
            equipment: dndclass.equipment,
            spellcasting_ability: dndclass.spellcasting_ability,
            hit_dice: dndclass.hit_dice,
            hp_at_1st_level: dndclass.hp_at_1st_level,
            hp_at_higher_levels: dndclass.hp_at_higher_levels,
            prof_armor: dndclass.prof_armor,
            prof_weapons: dndclass.prof_weapons,
            prof_tools: dndclass.prof_tools,
            prof_saving_throws: dndclass.prof_saving_throws,
            prof_skills: dndclass.prof_skills,
            subtypes_name: dndclass.subtypes_name,
            table: dndclass.table,
        };
    });
}