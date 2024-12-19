import { useState } from 'react';

import { Priority, priorityEnum } from '../../../server/src/db/schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';

export default function PriorityComponent() {
  const [selectedPriority, setSelectedPriority] = useState<
    Priority | 'all' | null
  >('all');

  return (
    <Select
      value={selectedPriority ?? undefined}
      onValueChange={(value: Priority) =>
        setSelectedPriority(value === selectedPriority ? null : value)
      }
    >
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {priorityEnum.enumValues.map((priority) => (
          <SelectItem key={priority} value={priority}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
