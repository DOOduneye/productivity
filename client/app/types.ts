import { z } from 'zod';

const rootSchema = z.object({
  id: z.number(),
  updated_at: z.date().nullable(),
  created_at: z.date(),
  deleted_at: z.date().nullable()
});

export const statusEnum = z.enum(['todo', 'active', 'completed']);
export type Status = z.infer<typeof statusEnum>;

export const priorityEnum = z.enum(['low', 'medium', 'high']);
export type Priority = z.infer<typeof priorityEnum>;

export const taskSchema = z.object({
  ...rootSchema.shape,
  completed: z.boolean(),
  title: z.string(),
  description: z.string().nullable(),
  milestone_id: z.number().nullable()
});

export type Task = z.infer<typeof taskSchema>;

export const milestoneSchema = z.object({
  ...rootSchema.shape,
  completed: z.boolean(),
  status: statusEnum,
  priority: priorityEnum,
  title: z.string(),
  description: z.string().nullable(),
  start_date: z.date().nullable(),
  end_date: z.date().nullable()
});

export type Milestone = z.infer<typeof milestoneSchema>;
