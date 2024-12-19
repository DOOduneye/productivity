import {PostgresJsDatabase} from 'drizzle-orm/postgres-js';
import {tasks} from '../db/schema';

export interface ITaskService {
  getTasks(): Promise<(typeof tasks.$inferSelect)[]>;
}

export class TaskService implements ITaskService {
  constructor(private readonly db: PostgresJsDatabase<Record<string, never>>) {}

  async getTasks() {
    return await this.db.select().from(tasks);
  }
}
