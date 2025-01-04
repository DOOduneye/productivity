import React, { Suspense } from 'react';

import { LoaderFunctionArgs } from '@remix-run/node';
import { Await, defer, useLoaderData } from '@remix-run/react';
import { PlusCircle } from 'lucide-react';

import MilestoneFiltersComponent from '~/components/milestone-filters';
import MilestonesComponent from '~/components/milestones';
import PriorityComponent from '~/components/priority';
import { Button } from '~/components/ui/button';
import type { Milestone, Task } from '~/lib/types';
import MilestoneCard from '~/components/milestone-card';

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const priority = url.searchParams.get('priority');

    try {
        const queryParams = new URLSearchParams();
        if (status) queryParams.set('status', status);
        if (priority) queryParams.set('priority', priority);

        const queryString = queryParams.toString();

        // Fetch milestones
        const milestonesPromise = fetch(`http://localhost:8000/api/v1/milestones${queryString ? `?${queryString}` : ''}`)
            .then(res => {
                if (!res.ok) {
                    throw new Response("Failed to load milestones", { status: res.status });
                }
                return res.json();
            });

        const milestones = await milestonesPromise;

        const tasksPromises = milestones.map(async (milestone: Milestone) => {
            const response = await fetch(`http://localhost:8000/api/v1/milestones/${milestone.id}/tasks`);
            if (!response.ok) {
                throw new Response(`Failed to load tasks for milestone ${milestone.id}`, {
                    status: response.status
                });
            }
            const tasks = await response.json();
            return tasks;
        });

        return defer({
            milestones,
            tasks: Promise.all(tasksPromises)
        });
    } catch (error) {
        throw new Response("Failed to load milestones data", { status: 500 });
    }
}

export default function Dashboard() {
    const { milestones, tasks } = useLoaderData<typeof loader>();

    return (
        <div className="flex h-screen p-10 flex-col gap-4">
            <h1 className="text-2xl font-bold">Productivity</h1>
            <div className="flex flex-row gap-2 justify-between">
                <MilestoneFiltersComponent />
                <div className="flex flex-row gap-2">
                    <PriorityComponent />
                    <Button>
                        <PlusCircle className="h-4 w-4" /> New Milestone
                    </Button>
                </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={tasks}>
                    {(tasksData) => {
                        const flattenedTasks = tasksData.flat();


                        return (
                            <div>
                                {milestones.map((milestone: Milestone) => (
                                    <MilestoneCard
                                        key={milestone.id}
                                        milestone={milestone}
                                        tasks={flattenedTasks.filter((task: Task) =>
                                            task.milestone_id === milestone.id
                                        )}
                                    />
                                ))}
                            </div>
                        );
                    }}
                </Await>
            </Suspense>
        </div>
    );
}
