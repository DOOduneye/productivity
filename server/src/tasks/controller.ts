import type {Request, Response} from 'express';
import type {ITaskService} from './service.js';

export class TaskController {
  constructor(private readonly taskService: ITaskService) {}

  getTasks = async (_: Request, res: Response) => {
    try {
      const tasks = await this.taskService.getTasks();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({error: 'Failed to fetch tasks'});
    }
  };

  getTask = async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const task = await this.taskService.getTask(Number(id));
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({error: 'Failed to fetch task'});
    }
  };

  createTask = async (req: Request, res: Response) => {
    try {
      const task = await this.taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({error: 'Failed to create task'});
    }
  };

  updateTask = async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const task = await this.taskService.updateTask(Number(id), req.body);
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({error: 'Failed to update task'});
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      await this.taskService.deleteTask(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({error: 'Failed to delete task'});
    }
  };
}
