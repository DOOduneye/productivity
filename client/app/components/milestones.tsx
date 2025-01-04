import MilestoneCard from './milestone-card';

import { Milestone, Task } from '~/lib/types';

export default function MilestonesComponent({ milestones, tasks }: { milestones: Milestone[], tasks: Task[] }) {
  return (
    <div>
      {milestones.map((milestone) => (
        <MilestoneCard key={milestone.id} milestone={milestone} tasks={tasks.filter(task => task.milestone_id === milestone.id)} />
      ))}
    </div>
  );
}
