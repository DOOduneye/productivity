import type {Request, Response} from 'express';
import type {IMilestoneService} from './service.js';
import {z} from 'zod';

const MilestoneFiltersSchema = z.object({
  status: z.enum(['todo', 'active', 'completed']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

export type MilestoneFilters = z.infer<typeof MilestoneFiltersSchema>;

export class MilestoneController {
  constructor(private readonly milestoneService: IMilestoneService) {}

  getMilestones = async (req: Request, res: Response) => {
    try {
      const result = MilestoneFiltersSchema.safeParse({
        status: req.query.status,
        priority: req.query.priority,
      });

      if (!result.success) {
        res.status(400).json({
          error: 'Invalid filters',
          details: result.error.issues,
        });
      }

      const milestones = await this.milestoneService.getMilestones(result.data);
      res.status(200).json(milestones);
    } catch (error) {
      res.status(500).json({error: 'Failed to fetch milestones'});
    }
  };

  getMilestone = async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const milestone = await this.milestoneService.getMilestone(Number(id));
      res.status(200).json(milestone);
    } catch (error) {
      res.status(500).json({error: 'Failed to fetch milestone'});
    }
  };

  getMilestoneTasks = async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const tasks = await this.milestoneService.getMilestoneTasks(Number(id));
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({error: 'Failed to fetch milestone tasks'});
    }
  };

  createMilestone = async (req: Request, res: Response) => {
    try {
      const milestone = await this.milestoneService.createMilestone(req.body);
      res.status(201).json(milestone);
    } catch (error) {
      res.status(500).json({error: 'Failed to create milestone'});
    }
  };

  createMilestoneTask = async (req: Request, res: Response) => {
    try {
      const {milestoneId} = req.params;
      const task = await this.milestoneService.createMilestoneTask(
        Number(milestoneId),
        req.body,
      );
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({error: 'Failed to create milestone task'});
    }
  };

  updateMilestone = async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const milestone = await this.milestoneService.updateMilestone(
        Number(id),
        req.body,
      );
      res.status(200).json(milestone);
    } catch (error) {
      res.status(500).json({error: 'Failed to update milestone'});
    }
  };

  deleteMilestone = async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      await this.milestoneService.deleteMilestone(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({error: 'Failed to delete milestone'});
    }
  };
}
