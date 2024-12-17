import {PostgresJsDatabase} from 'drizzle-orm/postgres-js';
import {milestones} from '../db/schema';

export interface IMilestoneService {
  getMilestones(): Promise<(typeof milestones.$inferSelect)[]>;
}

export class MilestoneService implements IMilestoneService {
  constructor(private readonly db: PostgresJsDatabase<Record<string, never>>) {}

  async getMilestones() {
    return await this.db.select().from(milestones);
  }
}
