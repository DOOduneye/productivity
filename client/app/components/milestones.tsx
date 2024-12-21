import { Milestone } from '~/types';

import MilestoneCard from './milestone-card';

export default function MilestonesComponent({ milestones }: { milestones: Milestone[] }) {
  return (
    <div>
      {milestones.map((milestone) => (
        <MilestoneCard key={milestone.id} milestone={milestone} />
      ))}
    </div>
  );
}
