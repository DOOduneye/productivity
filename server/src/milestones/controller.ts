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

  getMilestone = async (req: Request, res: Response) => {
    const {id} = req.params;
    const milestone = await this.milestoneService.getMilestone(Number(id));
    res.status(200).json(milestone);
  };

  createMilestone = async (req: Request, res: Response) => {
    const milestone = await this.milestoneService.createMilestone(req.body);
    res.status(201).json(milestone);
  };

  updateMilestone = async (req: Request, res: Response) => {
    const {id} = req.params;
    const milestone = await this.milestoneService.updateMilestone(
      Number(id),
      req.body,
    );
    res.status(200).json(milestone);
  };

  deleteMilestone = async (req: Request, res: Response) => {
    const {id} = req.params;
    await this.milestoneService.deleteMilestone(Number(id));
    res.status(204).send();
  };
}
