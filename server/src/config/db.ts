import { drizzle } from 'drizzle-orm/pg-core';
import { Pool } from 'pg';
import * as schema from '../models/schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });