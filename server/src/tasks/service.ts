import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { type RowList } from 'postgres';

import { type Task, tasks } from '../db/schema.js';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../utils/const.js';
import type { Pagination } from '../utils/pagination.js';

export interface ITaskService {
  getTasks(pagination?: Pagination): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  updateTask(id: number, task: Task): Promise<Task[]>;
  deleteTask(id: number): Promise<RowList<never[]>>;
}

export class TaskService implements ITaskService {
  constructor(private readonly db: PostgresJsDatabase<Record<string, never>>) {}

  async getTasks(pagination?: Pagination) {
    return await this.db
      .select()
      .from(tasks)
      .limit(pagination?.pageSize ?? DEFAULT_PAGE_SIZE)
      .offset((pagination?.page ?? DEFAULT_PAGE - 1) * (pagination?.pageSize ?? DEFAULT_PAGE_SIZE));
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
