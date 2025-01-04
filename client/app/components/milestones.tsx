import MilestoneCard from './milestone-card';

import { Milestone } from '~/lib/types';

export default function MilestonesComponent({ milestones }: { milestones: Milestone[] }) {
  return (
    <div>
      {milestones.map((milestone) => (
        <MilestoneCard key={milestone.id} milestone={milestone} />
      ))}
    </div>
  );
}
