import { and, eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type { RowList } from 'postgres';

import {
  type Milestone,
  type Priority,
  type Status,
  type Task,
  milestones,
  tasks
} from '../db/schema.js';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../utils/const.js';
import type { Pagination } from '../utils/pagination.js';
import type { MilestoneFilters } from './controller.js';

export interface IMilestoneService {
  getMilestones(filters?: MilestoneFilters, pagination?: Pagination): Promise<Milestone[]>;
  getMilestone(id: number): Promise<Milestone | undefined>;
  getMilestoneTasks(id: number, pagination?: Pagination): Promise<Task[]>;
  createMilestone(milestone: Milestone): Promise<Milestone[]>;
  createMilestoneTask(milestoneId: number, task: Task): Promise<Task[]>;
  updateMilestone(id: number, milestone: Milestone): Promise<Milestone[]>;
  deleteMilestone(id: number): Promise<RowList<never[]>>;
}

export class MilestoneService implements IMilestoneService {
  constructor(private readonly db: PostgresJsDatabase<Record<string, never>>) {}

  async getMilestones(filters?: MilestoneFilters, pagination?: Pagination) {
    console.log(pagination);
    return await this.db
      .select()
      .from(milestones)
      .where(
        and(
          filters?.status ? eq(milestones.status, filters.status as Status) : undefined,
          filters?.priority ? eq(milestones.priority, filters.priority as Priority) : undefined
        )
      )
      .limit(pagination?.pageSize ?? DEFAULT_PAGE_SIZE)
      .offset((pagination?.page ?? DEFAULT_PAGE - 1) * (pagination?.pageSize ?? DEFAULT_PAGE_SIZE));
  }

  async getMilestone(id: number) {
    return await this.db
      .select()
      .from(milestones)
      .where(eq(milestones.id, id))
      .limit(1)
      .then(([milestone]) => milestone);
  }

  async getMilestoneTasks(id: number, pagination?: Pagination) {
    return await this.db
      .select()
      .from(tasks)
      .where(eq(tasks.milestone_id, id))
      .limit(pagination?.pageSize ?? DEFAULT_PAGE_SIZE)
      .offset((pagination?.page ?? DEFAULT_PAGE - 1) * (pagination?.pageSize ?? DEFAULT_PAGE_SIZE));
  }

  async createMilestone(milestone: Milestone) {
    return await this.db.insert(milestones).values(milestone);
  }

  async createMilestoneTask(milestoneId: number, task: Task) {
    return await this.db.insert(tasks).values({ ...task, milestone_id: milestoneId });
  }

  async updateMilestone(id: number, milestone: Milestone) {
    return await this.db.update(milestones).set(milestone).where(eq(milestones.id, id));
  }

  async deleteMilestone(id: number) {
    return await this.db.delete(milestones).where(eq(milestones.id, id));
  }
}
