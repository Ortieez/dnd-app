import { SpellInsert, Spell, APISpell } from '../../../main/types';
import { spells } from '../../../db/schema';
import { database } from '../db';
import { eq } from 'drizzle-orm';

export const getSpells = async (): Promise<Spell[]> => {
    try {
        return database.select().from(spells);
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const getSpell = async (id: number): Promise<Spell[]> => {
    try {
        return database.select().from(spells).where(eq(spells.id, id));
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createSpell = async (newSpell: SpellInsert): Promise<Spell[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(spells).values(newSpell).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createManySpells = async (newSpells: SpellInsert[]): Promise<Spell[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.insert(spells).values(newSpells).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const updateSpell = async (id: number, updatedSpell: Partial<SpellInsert>): Promise<Spell[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.update(spells).set(updatedSpell).where(eq(spells.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const deleteSpell = async (id: number): Promise<Spell[]> => {
    try {
        return await database.transaction(async (trx) => {
            return trx.delete(spells).where(eq(spells.id, id)).returning();
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const parseSpellsFromAPI = (spells: APISpell[]): SpellInsert[] => {
    return spells.map((spell: APISpell): SpellInsert => {
        return {
            slug: spell.slug,
            name: spell.name,
            desc: spell.desc,
            higher_level: spell.higher_level,
            range_text: spell.range,
            range_number: spell.target_range_sort,
            verbal_required: spell.requires_verbal_components,
            somatic_required: spell.requires_somatic_components,
            material_required: spell.requires_material_components,
            material: spell.material,
            can_be_cast_as_ritual: spell.can_be_cast_as_ritual,
            duration: spell.duration,
            requires_concentration: spell.requires_concentration,
            casting_time: spell.casting_time,
            level: spell.level,
            level_int: spell.level_int,
            spell_level: spell.spell_level,
            school: spell.school,
            dnd_class: spell.dnd_class,
            spell_lists: spell.spell_lists,
            archetype: spell.archetype,
            circles: spell.circles,
        };
    });
}
