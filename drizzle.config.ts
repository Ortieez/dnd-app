import type { Config } from 'drizzle-kit'
import { app } from 'electron'
import path from 'path'

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: "sqlite.db"
  }
} satisfies Config
