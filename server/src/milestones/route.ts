import {Router} from 'express';
import {MilestoneController} from './controller.js';

export function createMilestoneRouter(
  milestoneController: MilestoneController,
): Router {
  const router = Router();

  router.get('/', milestoneController.getMilestones);
  router.get('/:id', milestoneController.getMilestone);
  router.get('/:id/tasks', milestoneController.getMilestoneTasks);
  router.post('/:milestoneId/tasks', milestoneController.createMilestoneTask);
  router.post('/', milestoneController.createMilestone);
  router.put('/:id', milestoneController.updateMilestone);
  router.delete('/:id', milestoneController.deleteMilestone);

  return router;
}
