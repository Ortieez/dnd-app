import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import * as schema from '../db/schema'
import fs from 'fs'
import { app } from 'electron'
import path from 'path'
import { PackInsert, PackType } from './types'

const dbPath = import.meta.env.DEV ? 'sqlite.db' : path.join(app.getPath('userData'), 'data.db')

fs.mkdirSync(path.dirname(dbPath), { recursive: true })

const sqlite = new Database(
  dbPath
)

export const db = drizzle(sqlite, { schema })

function toDrizzleResult(row: Record<string, any>)
function toDrizzleResult(rows: Record<string, any> | Array<Record<string, any>>) {
  if (!rows) {
    return []
  }
  if (Array.isArray(rows)) {
    return rows.map((row) => {
      return Object.keys(row).map((key) => row[key])
    })
  } else {
    return Object.keys(rows).map((key) => rows[key])
  }
}

export const execute = async (_e, sqlstr, params, method) => {
  const result = sqlite.prepare(sqlstr)
  const ret = result[method](...params)
  return toDrizzleResult(ret)
}

export const runMigrate = async () => {
  try {
    await migrate(db, {
      migrationsFolder: path.join(__dirname, '../../drizzle')
    })
  } catch (e) {
    console.error(e)
  }
}

export const seedDownloadablePacks = async () => {
  const packs = {
    "Spells": {
      "url": "https://api.open5e.com/v1/spells/?format=json",
      "packType": PackType.Spell,
      "imagePath": "spells",
      "description": "A pack that contains around 1400+ spells from open5e",
    },
    "Spell Lists": {
      "url": "https://api.open5e.com/v1/spelllist/?format=json",
      "packType": PackType.SpellList,
      "imagePath": "spelllists",
      "description": "A pack that contains spell lists for each class",
    },
    "Monsters": {
      "url": "https://api.open5e.com/v1/monsters/?format=json",
      "packType": PackType.Monster,
      "imagePath": "monsters",
      "description": "A pack that contains around 2000+ monsters from open5e",
    },
    "Backgrounds": {
      "url": "https://api.open5e.com/v1/backgrounds/?format=json",
      "packType": PackType.Background,
      "imagePath": "backgrounds",
      "description": "A pack that contains backgrounds from open5e",
    },
    "Planes": {
      "url": "https://api.open5e.com/v1/planes/?format=json",
      "packType": PackType.Plane,
      "imagePath": "planes",
      "description": "A pack that contains planes from open5e",
    },
    "Sections": {
      "url": "https://api.open5e.com/v1/sections/?format=json",
      "packType": PackType.Section,
      "imagePath": "sections",
      "description": "A pack that contains sections from open5e",
    },
    "Feats": {
      "url": "https://api.open5e.com/v1/feats/?format=json",
      "packType": PackType.Feat,
      "imagePath": "feats",
      "description": "A pack that contains feats from open5e",
    },
    "Conditions": {
      "url": "https://api.open5e.com/v1/conditions/?format=json",
      "packType": PackType.Condition,
      "imagePath": "conditions",
      "description": "A pack that contains conditions from open5e",
    },
    "Races": {
      "url": "https://api.open5e.com/v1/races/?format=json",
      "packType": PackType.Race,
      "imagePath": "races",
      "description": "A pack that contains races from open5e",
    },
    "Classes": {
      "url": "https://api.open5e.com/v1/classes/?format=json",
      "packType": PackType.Class,
      "imagePath": "classes",
      "description": "A pack that contains classes from open5e",
    },
    "Magic Items": {
      "url": "https://api.open5e.com/v1/magicitems/?format=json",
      "packType": PackType.MagicItem,
      "imagePath": "magicitems",
      "description": "A pack that contains magic items from open5e",
    },
    "Weapons": {
      "url": "https://api.open5e.com/v1/weapons/?format=json",
      "packType": PackType.Weapon,
      "imagePath": "weapons",
      "description": "A pack that contains weapons from open5e",
    },
    "Armors": {
      "url": "https://api.open5e.com/v1/armor/?format=json",
      "packType": PackType.Armor,
      "imagePath": "armors",
      "description": "A pack that contains armors from open5e",
    },
  }

  const packsInDB = await db.select().from(schema.packs);

  if (packsInDB.length === 0) {
    for (const packName in packs) {
      const pack: PackInsert = {
        name: packName,
        url: packs[packName].url,
        packType: packs[packName].packType,
        image: packs[packName].imagePath,
        description: packs[packName].description,
        downloaded: false,
      }

      await db.insert(schema.packs).values(pack).execute()
    }
  }

};
