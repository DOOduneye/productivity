import express from 'express';
import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {TaskController} from './tasks/controller';
import {TaskService} from './tasks/service';
import {Request, Response} from 'express';
import {MilestoneService} from './milestones/service';
import {MilestoneController} from './milestones/controller';

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

app.get('/milestones', milestoneController.getMilestones);
app.get('/milestones/:id', milestoneController.getMilestone);
app.post('/milestones', milestoneController.createMilestone);
app.put('/milestones/:id', milestoneController.updateMilestone);
app.delete('/milestones/:id', milestoneController.deleteMilestone);

app.get('/tasks', taskController.getTasks);
app.get('/tasks/:id', taskController.getTask);
app.post('/tasks', taskController.createTask);
app.put('/tasks/:id', taskController.updateTask);
app.delete('/tasks/:id', taskController.deleteTask);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
