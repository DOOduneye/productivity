import {PostgresJsDatabase} from 'drizzle-orm/postgres-js';
import {Milestone, milestones} from '../db/schema';
import {eq} from 'drizzle-orm';
import {RowList} from 'postgres';

export interface IMilestoneService {
  getMilestones(): Promise<(typeof milestones.$inferSelect)[]>;
  getMilestone(id: number): Promise<typeof milestones.$inferSelect>;
  createMilestone(
    milestone: Milestone,
  ): Promise<(typeof milestones.$inferInsert)[]>;
  updateMilestone(
    id: number,
    milestone: Milestone,
  ): Promise<(typeof milestones.$inferInsert)[]>;
  deleteMilestone(id: number): Promise<RowList<never[]>>;
}

export class MilestoneService implements IMilestoneService {
  constructor(private readonly db: PostgresJsDatabase<Record<string, never>>) {}

  async getMilestones() {
    return await this.db.select().from(milestones);
  }

  async getMilestone(id: number) {
    return await this.db
      .select()
      .from(milestones)
      .where(eq(milestones.id, id))
      .limit(1)
      .then(([milestone]) => milestone);
  }

  async createMilestone(milestone: Milestone) {
    return await this.db.insert(milestones).values(milestone);
  }

  async updateMilestone(id: number, milestone: Milestone) {
    return await this.db
      .update(milestones)
      .set(milestone)
      .where(eq(milestones.id, id));
  }

  async deleteMilestone(id: number) {
    return await this.db.delete(milestones).where(eq(milestones.id, id));
  }
}
