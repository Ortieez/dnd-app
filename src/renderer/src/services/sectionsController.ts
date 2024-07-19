import { SectionInsert, Section, APISection } from '../../../main/types';
import { sections } from '../../../db/schema';
import { database } from '../db';
import { eq } from 'drizzle-orm';

export const getSections = async (): Promise<Section[]> => {
    try {
        return database.select().from(sections);
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const getSection = async (id: number): Promise<Section[]> => {
    try {
        return database.select().from(sections).where(eq(sections.id, id));
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createSection = async (newSection: SectionInsert): Promise<Section[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(sections).values(newSection).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createManySections = async (newSection: SectionInsert[]): Promise<Section[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(sections).values(newSection).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const updateSection = async (id: number, updatedSection: Partial<SectionInsert>): Promise<Section[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.update(sections).set(updatedSection).where(eq(sections.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const deleteSection = async (id: number): Promise<Section[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.delete(sections).where(eq(sections.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const parseSectionsFromAPI = (sections: APISection[]): SectionInsert[] => {
    return sections.map((section: APISection): SectionInsert => {
        return {
            slug: section.slug,
            name: section.name,
            desc: section.desc,
            parent: section.parent,
        };
    });
}
