import {
  index,
  integer,
  pgEnum,
  pgTable as table,
  serial,
  timestamp,
  boolean,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';
import {InferSelectModel} from 'drizzle-orm';
import {timestamps} from './schema.helpers';

// TODO: Add more status levels
export const statusEnum = pgEnum('status', [
  // "backlog"
  'todo',
  'active',
  // "review",
  // "blocked",
  'completed',
  // "archived"
]);

// TODO: Add more priority levels
export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high']);

export const milestones = table('milestones', {
  ...timestamps,
  id: serial('id').primaryKey(),
  title: varchar('title', {length: 100}).notNull(),
  description: varchar('description', {length: 1000}),
  priority: priorityEnum('priority').notNull().default('medium'),
  start_date: timestamp('start_date'),
  end_date: timestamp('end_date'),
  status: statusEnum('status').notNull().default('todo'),
  completed: boolean('completed').notNull().default(false),
});

// TODO: Cyclic relationship in the future.
export const tasks = table('tasks', {
  ...timestamps,
  id: serial('id').primaryKey(),
  milestone_id: integer('milestone_id').references(() => milestones.id),
  title: varchar('title', {length: 100}).notNull(),
  description: varchar('description', {length: 1000}),
  completed: boolean('completed').notNull().default(false),
});

export type Milestone = InferSelectModel<typeof milestones>;
export type Task = InferSelectModel<typeof tasks>;