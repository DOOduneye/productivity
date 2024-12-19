import {PostgresJsDatabase} from 'drizzle-orm/postgres-js';
import {type Task, tasks} from '../db/schema.js';
import {eq} from 'drizzle-orm';
import {type RowList} from 'postgres';

export interface ITaskService {
  getTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  updateTask(id: number, task: Task): Promise<Task[]>;
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

  async updateTask(id: number, task: Task) {
    return await this.db.update(tasks).set(task).where(eq(tasks.id, id));
  }

  async deleteTask(id: number) {
    return await this.db.delete(tasks).where(eq(tasks.id, id));
  }
}
