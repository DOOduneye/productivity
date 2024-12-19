import {Request, Response} from 'express';
import {ITaskService} from './service';

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
}
