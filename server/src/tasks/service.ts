import {PostgresJsDatabase} from 'drizzle-orm/postgres-js';
import {Task, tasks} from '../db/schema';
import {eq} from 'drizzle-orm';
import {RowList} from 'postgres';

export interface ITaskService {
  getTasks(): Promise<(typeof tasks.$inferSelect)[]>;
  getTask(id: number): Promise<typeof tasks.$inferSelect>;
  createTask(task: Task): Promise<(typeof tasks.$inferInsert)[]>;
  updateTask(id: number, task: Task): Promise<(typeof tasks.$inferInsert)[]>;
  deleteTask(id: number): Promise<RowList<never[]>>;
}

export class TaskService implements ITaskService {
  constructor(private readonly db: PostgresJsDatabase<Record<string, never>>) {}

  async getTasks() {
    return await this.db.select().from(tasks);
  }

  async getTask(id: number) {
    return await this.db
      .select()
      .from(tasks)
      .where(eq(tasks.id, id))
      .limit(1)
      .then(([task]) => task);
  }

  async createTask(task: Task) {
    return await this.db.insert(tasks).values(task);
  }

  async updateTask(id: number, task: Task) {
    return await this.db.update(tasks).set(task).where(eq(tasks.id, id));
  }

  async deleteTask(id: number) {
    return await this.db.delete(tasks).where(eq(tasks.id, id));
  }
}
