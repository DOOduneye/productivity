import { drizzle } from 'drizzle-orm/postgres-js';
import express from 'express';
import type { Request, Response } from 'express';
import postgres from 'postgres';

import { MilestoneController } from './milestones/controller.js';
import { createMilestoneRouter } from './milestones/route.js';
import { MilestoneService } from './milestones/service.js';
import { TaskController } from './tasks/controller.js';
import { createTaskRouter } from './tasks/route.js';
import { TaskService } from './tasks/service.js';

const app = express();
const port = process.env.PORT || '8000';

app.use(express.json());

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString);
const db = drizzle(client);

const milestoneService = new MilestoneService(db);
const milestoneController = new MilestoneController(milestoneService);

const taskService = new TaskService(db);
const taskController = new TaskController(taskService);

app.get('/health', (_: Request, res: Response) => {
  res.status(200).send('OK');
});

app.use('/api/v1/milestones', createMilestoneRouter(milestoneController));
app.use('/api/v1/tasks', createTaskRouter(taskController));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
