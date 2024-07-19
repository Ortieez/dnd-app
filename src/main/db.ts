import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import * as schema from '../db/schema'
import fs from 'fs'
import { app } from 'electron'
import path from 'path'
import { PackInsert } from './types'

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
    "spells": "https://api.open5e.com/v1/spells/",
    "spelllist": "https://api.open5e.com/v1/spelllist/",
    "monsters": "https://api.open5e.com/v1/monsters/",
    "documents": "https://api.open5e.com/v1/documents/",
    "backgrounds": "https://api.open5e.com/v1/backgrounds/",
    "planes": "https://api.open5e.com/v1/planes/",
    "sections": "https://api.open5e.com/v1/sections/",
    "feats": "https://api.open5e.com/v1/feats/",
    "conditions": "https://api.open5e.com/v1/conditions/",
    "races": "https://api.open5e.com/v1/races/",
    "classes": "https://api.open5e.com/v1/classes/",
    "magicitems": "https://api.open5e.com/v1/magicitems/",
    "weapons": "https://api.open5e.com/v1/weapons/",
    "armor": "https://api.open5e.com/v1/armor/",
  }

  const packsInDB = await db.select().from(schema.packs);

  if (packsInDB.length === 0) {
    for (const packName in packs) {
      const pack: PackInsert = {
        name: packName,
        url: packs[packName],
        downloaded: false,
      }

      await db.insert(schema.packs).values(pack).execute()
    }
  }

};
