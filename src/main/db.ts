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
    "spells": {
      "url": "https://api.open5e.com/v1/spells/?format=json",
      "packType": PackType.Spell,
    },
    "spelllist": {
      "url": "https://api.open5e.com/v1/spelllist/?format=json",
      "packType": PackType.SpellList,
    },
    "monsters": {
      "url": "https://api.open5e.com/v1/monsters/?format=json",
      "packType": PackType.Monster,
    },
    "backgrounds": {
      "url": "https://api.open5e.com/v1/backgrounds/?format=json",
      "packType": PackType.Background,
    },
    "planes": {
      "url": "https://api.open5e.com/v1/planes/?format=json",
      "packType": PackType.Plane,
    },
    "sections": {
      "url": "https://api.open5e.com/v1/sections/?format=json",
      "packType": PackType.Section,
    },
    "feats": {
      "url": "https://api.open5e.com/v1/feats/?format=json",
      "packType": PackType.Feat,
    },
    "conditions": {
      "url": "https://api.open5e.com/v1/conditions/?format=json",
      "packType": PackType.Condition,
    },
    "races": {
      "url": "https://api.open5e.com/v1/races/?format=json",
      "packType": PackType.Race,
    },
    "classes": {
      "url": "https://api.open5e.com/v1/classes/?format=json",
      "packType": PackType.Class,
    },
    "magicitems": {
      "url": "https://api.open5e.com/v1/magicitems/?format=json",
      "packType": PackType.MagicItem,
    },
    "weapons": {
      "url": "https://api.open5e.com/v1/weapons/?format=json",
      "packType": PackType.Weapon,
    },
    "armor": {
      "url": "https://api.open5e.com/v1/armor/?format=json",
      "packType": PackType.Armor,
    },
  }

  const packsInDB = await db.select().from(schema.packs);

  if (packsInDB.length === 0) {
    for (const packName in packs) {
      const pack: PackInsert = {
        name: packName,
        url: packs[packName].url,
        packType: packs[packName].packType,
        downloaded: false,
      }

      await db.insert(schema.packs).values(pack).execute()
    }
  }

};
