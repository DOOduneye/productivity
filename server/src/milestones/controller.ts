import {Request, Response} from 'express';
import {IMilestoneService} from './service';

export class MilestoneController {
  constructor(private readonly milestoneService: IMilestoneService) {}

  getMilestones = async (_: Request, res: Response) => {
    try {
      const milestones = await this.milestoneService.getMilestones();
      res.status(200).json(milestones);
    } catch (error) {
      res.status(500).json({error: 'Failed to fetch milestones'});
    }
  };
}
