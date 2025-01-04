import { useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon, CircleCheck, Circle, CirclePlay, MoreVerticalIcon, Pen, CircleAlert } from 'lucide-react';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Progress } from './ui/progress';

import { Milestone, Priority, Task } from '~/lib/types';
import { Checkbox } from './ui/checkbox';

const priorityColors: Record<Priority, string> = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500'
};

export default function MilestoneCard({ milestone, tasks }: { milestone: Milestone, tasks: Task[] }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Card key={milestone.id} className="mb-4 rounded-md">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <CardTitle>{milestone.title}</CardTitle>
          <MilestoneActions milestone={milestone} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </div>
        <div className="flex flex-col">
          <CardDescription className="flex flex-row items-center gap-2 text-muted-foreground">
            <MilestoneTimeline milestone={milestone} />
            <p className="text-xs font-semibold">
              {milestone.start_date
                ? new Date(milestone.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                : 'No date set'}
            </p>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <MilestonePorgressBar tasks={tasks || []} />

        <Button variant="outline" className="w-fit">
          <Pen className="h-4 w-4" />
          Edit
        </Button>

        {isCollapsed ? (
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Subtasks</h3>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={task.completed}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className={task.completed ? 'line-through text-muted-foreground text-sm' : 'text-muted-foreground text-sm'}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

const MilestoneTimeline = ({ milestone }: { milestone: Milestone }) => {
  {/* Options
    If the milestone hasn't started yet
      Starting on {milestone.start_date}
    If the milestone has started but its not completed yet
      Started on {milestone.start_date}
    If the milestone has started but its not completed yet and its overdue by its end_date
      Started on {milestone.start_date}
      Overdue by {milestone.end_date < now}
    If the milestone was started and now its complete
      Completed on {milestone.start_date}
  */}

  const isStarted = milestone.start_date ? new Date(milestone.start_date) >= new Date() : null;

  console.log(milestone.start_date);
  console.log(isStarted);

  return (
    <>
      {/* <CircleCheck className="h-4 w-4 text-green-500 font-semibold" />
      <CircleAlert className="h-4 w-4 text-green-500 font-semibold" /> */}
      {isStarted ? <CirclePlay className="h-4 w-4 text-green-500 font-semibold" /> : null}
    </>
  );
}

const MilestoneActions = ({ milestone, isCollapsed, setIsCollapsed }: { milestone: Milestone, isCollapsed: boolean, setIsCollapsed: (isCollapsed: boolean) => void }) => {

  return (
    <div className="flex flex-row items-center gap-1">
      <div className="flex flex-row items-center gap-1">
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
      </DropdownMenu>
      <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? (
          <ChevronUpIcon className="h-4 w-4" />
        ) : (
          <ChevronDownIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

const MilestonePorgressBar = ({ tasks }: { tasks: Task[] }) => {
  const completedTasks = tasks?.filter(task => task.completed).length || 0;
  const totalTasks = tasks?.length || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="flex flex-col gap-2">
      <Progress value={progress} />
      <p className="text-xs text-muted-foreground">
        Progress: {completedTasks} of {totalTasks} subtasks completed
      </p>
    </div>
  );
};

{/* <DropdownMenu>
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
</DropdownMenu> */}