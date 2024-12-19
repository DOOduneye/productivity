import { useState } from 'react';

import { Status, statusEnum } from '../../../server/src/db/schema';
import { Button } from './ui/button';

export default function MilestoneFiltersComponent() {
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  const statusMap = {
    todo: 'To Do',
    in_progress: 'In Progress',
    completed: 'Completed'
  };

  return (
    <div className="flex flex-row gap-2">
      <Button
        variant={selectedStatus === null ? 'default' : 'outline'}
        onClick={() => setSelectedStatus(null)}
      >
        All
      </Button>
      {statusEnum.enumValues.map((status) => (
        <Button
          key={status}
          variant={status === selectedStatus ? 'default' : 'outline'}
          onClick={() => setSelectedStatus(status)}
        >
          {statusMap[status]}
        </Button>
      ))}
    </div>
  );
}
