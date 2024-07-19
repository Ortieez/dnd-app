import { PackInsert, Pack, Open5eRequest, APISpell, APISpellList, APIMonster, PackType, APIArmor, APIBackground, APIClass, APICondition, APIFeat, APIMagicItem, APIPlane, APIRace, APISection, APIWeapon } from '../../../main/types';
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

async function fetchAllPages<TPackType>(nextPageUrl: string | null): Promise<TPackType[]> {
    if (!nextPageUrl) {
        return [];
    }

    const response = await fetch(nextPageUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        return [];
    }

    const data: Open5eRequest<TPackType> = await response.json();

    const nextData = await fetchAllPages<TPackType>(data.next);

    return [...data.results, ...nextData];
}

export const downloadPack = async <TPackType>(id: number): Promise<TPackType[]> => {
    const pack = await getPack(id);

    if (pack.length === 0) {
        return [];
    }

    const packData = pack[0];

    if (packData.downloaded) {
        return [];
    }

    const data = await fetchAllPages<TPackType>(packData.url);

    if (data.length === 0) {
        return [];
    }

    try {
        await updatePack(id, { downloaded: true });
    } catch (e) {
        console.error(e);
    }

    return data;
}

export const downloadPackAccordingly = async (id: number, packType: PackType) => {
    switch (packType) {
        case PackType.Spell:
            return await downloadPack<APISpell>(id);
        case PackType.SpellList:
            return await downloadPack<APISpellList>(id);
        case PackType.Monster:
            return await downloadPack<APIMonster>(id);
        case PackType.Background:
            return await downloadPack<APIBackground>(id);
        case PackType.Plane:
            return await downloadPack<APIPlane>(id);
        case PackType.Section:
            return await downloadPack<APISection>(id);
        case PackType.Feat:
            return await downloadPack<APIFeat>(id);
        case PackType.Condition:
            return await downloadPack<APICondition>(id);
        case PackType.Race:
            return await downloadPack<APIRace>(id);
        case PackType.Class:
            return await downloadPack<APIClass>(id);
        case PackType.MagicItem:
            return await downloadPack<APIMagicItem>(id);
        case PackType.Weapon:
            return await downloadPack<APIWeapon>(id);
        case PackType.Armor:
            return await downloadPack<APIArmor>(id);
        default:
            return null;
    }
}