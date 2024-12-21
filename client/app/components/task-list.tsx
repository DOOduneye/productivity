import { Task } from '~/types';

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
