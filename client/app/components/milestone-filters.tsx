import { useSearchParams } from '@remix-run/react';

import { Button } from './ui/button';

import { Status, statusEnum } from '~/lib/types';

export default function MilestoneFiltersComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedStatus = searchParams.get('status') as Status | null;

  const statusMap = {
    todo: 'To Do',
    active: 'In Progress',
    completed: 'Completed'
  };

  const handleStatusChange = (status: Status | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (status) {
      newSearchParams.set('status', status);
    } else {
      newSearchParams.delete('status');
    }
    setSearchParams(newSearchParams);
  };

  return (
    <div className="flex flex-row gap-2">
      <Button
        variant={selectedStatus === null ? 'default' : 'outline'}
        onClick={() => handleStatusChange(null)}
      >
        All
      </Button>
      {statusEnum.options.map((status: Status) => (
        <Button
          key={status}
          variant={status === selectedStatus ? 'default' : 'outline'}
          onClick={() => handleStatusChange(status)}
        >
          {statusMap[status as keyof typeof statusMap]}
        </Button>
      ))}
    </div>
  );
}
