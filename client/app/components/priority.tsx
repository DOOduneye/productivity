import { useSearchParams } from '@remix-run/react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

import { Priority, priorityEnum } from '~/lib/types';

export default function PriorityComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPriority = searchParams.get('priority') as Priority | null;

  const handlePriorityChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newSearchParams.delete('priority');
    } else {
      newSearchParams.set('priority', value);
    }
    setSearchParams(newSearchParams);
  };

  return (
    <Select
      value={selectedPriority ?? 'all'}
      onValueChange={handlePriorityChange}
    >
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {priorityEnum.options.map((priority: Priority) => (
          <SelectItem key={priority} value={priority}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
