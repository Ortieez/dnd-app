import { PackInsert, Pack, Open5eRequest, APISpell, APISpellList, APIMonster, PackType, APIArmor, APIBackground, APIClass, APICondition, APIFeat, APIMagicItem, APIPlane, APIRace, APISection, APIWeapon } from '../../../main/types';
import { packs } from '../../../db/schema';
import { database } from '../db';
import { eq } from 'drizzle-orm';
import { createManySpells, parseSpellsFromAPI } from './spellsController';
import { createManySections, parseSectionsFromAPI } from './sectionsController';
import { createManySpellLists, parseSpellListsFromAPI } from './spellListsController';
import { createManyRaces, parseRacesFromAPI } from './racesController';
import { createManyMonsters, parseMonstersFromAPI } from './monstersController';
import { createManyPlanes, parsePlanesFromAPI } from './planesController';
import { createManyMagicItems, parseMagicItemsFromAPI } from './magicItemsController';
import { createManyWeapons, parseWeaponsFromAPI } from './weaponsController';
import { createManyArmors, parseArmorsFromAPI } from './armorsController';
import { createManyBackgrounds, parseBackgroundsFromAPI } from './backgroundsController';
import { createManyClasses, parseClassesFromAPI } from './classesController';
import { createManyConditions, parseConditionsFromAPI } from './conditionsController';
import { createManyFeats, parseFeatsFromAPI } from './featsController';

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

type PackDownloadFunction = <TPackType>(id: number) => Promise<TPackType[]>;

const packDownloaders: Record<PackType, PackDownloadFunction> = {
    [PackType.Spell]: downloadPack,
    [PackType.SpellList]: downloadPack,
    [PackType.Monster]: downloadPack,
    [PackType.Background]: downloadPack,
    [PackType.Plane]: downloadPack,
    [PackType.Section]: downloadPack,
    [PackType.Feat]: downloadPack,
    [PackType.Condition]: downloadPack,
    [PackType.Race]: downloadPack,
    [PackType.Class]: downloadPack,
    [PackType.MagicItem]: downloadPack,
    [PackType.Weapon]: downloadPack,
    [PackType.Armor]: downloadPack,
};

export const downloadPackAccordingly = async (id: number, packType: PackType) => {
    const downloadFunction = packDownloaders[packType];
    if (!downloadFunction) {
        console.error(`No download function available for pack type: ${packType}`);
        return null;
    }
    return downloadFunction(id);
};

const packTypeProcessors = {
    [PackType.Spell]: async (data: unknown) => await createManySpells(parseSpellsFromAPI(data as APISpell[])),
    [PackType.SpellList]: async (data: unknown) => await createManySpellLists(parseSpellListsFromAPI(data as APISpellList[])),
    [PackType.Section]: async (data: unknown) => await createManySections(parseSectionsFromAPI(data as APISection[])),
    [PackType.Race]: async (data: unknown) => await createManyRaces(parseRacesFromAPI(data as APIRace[])),
    [PackType.Monster]: async (data: unknown) => await createManyMonsters(parseMonstersFromAPI(data as APIMonster[])),
    [PackType.Background]: async (data: unknown) => await createManyBackgrounds(parseBackgroundsFromAPI(data as APIBackground[])),
    [PackType.Plane]: async (data: unknown) => await createManyPlanes(parsePlanesFromAPI(data as APIPlane[])),
    [PackType.Feat]: async (data: unknown) => await createManyFeats(parseFeatsFromAPI(data as APIFeat[])),
    [PackType.Condition]: async (data: unknown) => await createManyConditions(parseConditionsFromAPI(data as APICondition[])),
    [PackType.Class]: async (data: unknown) => await createManyClasses(parseClassesFromAPI(data as APIClass[])),
    [PackType.MagicItem]: async (data: unknown) => await createManyMagicItems(parseMagicItemsFromAPI(data as APIMagicItem[])),
    [PackType.Weapon]: async (data: unknown) => await createManyWeapons(parseWeaponsFromAPI(data as APIWeapon[])),
    [PackType.Armor]: async (data: unknown) => await createManyArmors(parseArmorsFromAPI(data as APIArmor[])),
};

export const processData = async (packType: PackType, data) => {
    const process = packTypeProcessors[packType];
    if (process) {
        await process(data);
    } else {
        console.error("Unsupported pack type:", packType);
    }
};