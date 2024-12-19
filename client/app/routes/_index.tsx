import { useLoaderData } from '@remix-run/react';
import { PlusCircle } from 'lucide-react';
import MilestoneFiltersComponent from '~/components/milestone-filters';
import MilestonesComponent from '~/components/milestones';
import PriorityComponent from '~/components/priority';
import { Button } from '~/components/ui/button';

export async function loader() {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/milestones`);
    const milestones = await response.json();

    return Response.json({ milestones });
  } catch (error) {
    console.error('Failed to fetch milestones:', error);
    return Response.json({
      milestones: [],
      error: 'Failed to load milestones'
    });
  }
}

export default function Index() {
  const { milestones } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen p-10 flex-col gap-4">
      <h1 className="text-2xl font-bold">Productivity</h1>
      <div className="flex flex-row gap-2 justify-between">
        <MilestoneFiltersComponent />
        <div className="flex flex-row gap-2">
          <PriorityComponent />
          <Button>
            {' '}
            <PlusCircle className="h-4 w-4" /> New Milestone
          </Button>
        </div>
      </div>
      <MilestonesComponent milestones={milestones} />
    </div>
  );
}
