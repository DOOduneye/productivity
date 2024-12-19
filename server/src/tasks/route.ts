import {Router} from 'express';
import {TaskController} from './controller.js';

export function createTaskRouter(taskController: TaskController): Router {
  const router = Router();

  router.get('/', taskController.getTasks);
  router.get('/:id', taskController.getTask);
  router.put('/:id', taskController.updateTask);
  router.delete('/:id', taskController.deleteTask);

  return router;
}
