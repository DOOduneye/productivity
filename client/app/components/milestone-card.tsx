import { useState } from 'react';

import {
  ChevronDownIcon,
  ChevronUpIcon,
  CirclePlay,
  MoreVerticalIcon,
  Pen
} from 'lucide-react';

import { Milestone } from '../../../server/src/db/schema';
import TaskList from './task-list';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Progress } from './ui/progress';

const priorityColors = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500'
};

export default function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card key={milestone.id} className="mb-4 rounded-md">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <CardTitle>{milestone.title}</CardTitle>
          <div className="flex flex-row items-center gap-1">
            <div className="flex flex-row items-center gap-2">
              <Badge variant={'outline'} className="text-xs rounded-lg">
                {milestone.status}
              </Badge>
              <div
                className={`h-3 w-3 rounded-full ${priorityColors[milestone.priority]}`}
                title={`Priority: ${milestone.priority}`}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit Task</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                <DropdownMenuItem>To Do</DropdownMenuItem>
                <DropdownMenuItem>In Progress</DropdownMenuItem>
                <DropdownMenuItem>Completed</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Change Priority</DropdownMenuLabel>
                <DropdownMenuItem>Low</DropdownMenuItem>
                <DropdownMenuItem>Medium</DropdownMenuItem>
                <DropdownMenuItem>High</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          <CardDescription className="flex flex-row items-center gap-2 text-muted-foreground text-green-600">
            <CirclePlay className="h-4 w-4" />
            <p className="text-xs font-semibold">
              {milestone.start_date
                ? new Date(milestone.start_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : 'No date set'}
            </p>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Progress value={33} />
          <p className="text-xs text-muted-foreground">
            Progress: {2} of {4} subtasks completed
          </p>
        </div>

        {expanded && (
          <>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                {milestone.description}
              </p>
            </div>

            {/* <div className="space-y-2">
                <h4 className="font-medium">Subtasks</h4>
                  <TaskList tasks={milestone.id} />
            </div> */}

            {/* <div className="space-y-2">
                <h4 className="font-medium">Subtasks</h4>
                {localTask.subtasks.map((subtask, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                    id={`subtask-${index}`}
                    checked={subtask.completed}
                    onCheckedChange={() => handleSubtaskToggle(index)}
                    />
                    <label htmlFor={`subtask-${index}`} className="text-sm">{subtask.title}</label>
                </div>
                ))}
            </div>
            {task.tags && task.tags.length > 0 && (
                <div className="flex items-center space-x-2">
                <TagIcon className="h-4 w-4 text-muted-foreground" />
                {task.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
                </div>
            )}
            {task.reminder && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <AlertCircleIcon className="h-4 w-4" />
                <span>Reminder: {task.reminder}</span>
                </div>
            )}
            </div> */}
          </>
        )}

        <Button variant="outline" className="w-fit">
          <Pen className="h-4 w-4" />
          Edit
        </Button>
      </CardContent>
    </Card>
  );
}
