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
      const milestones = await this.milestoneService.getMilestones();
      res.status(200).json(milestones);
    } catch (error) {
      res.status(500).json({error: 'Failed to fetch milestones'});
    }
  };
}
