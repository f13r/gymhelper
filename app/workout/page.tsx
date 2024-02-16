import React from 'react';
import { WorkoutsComponent } from '@/app/ui/workout/workouts';
import {
  fetchTags,
  fetchWorkouts,
  WorkoutsWithTag,
} from '@/app/lib/actions/workouts';

export default async function Page() {
  const workouts: WorkoutsWithTag = await fetchWorkouts('id');
  const tags = await fetchTags();

  return <WorkoutsComponent workouts={workouts} tags={tags} />;
}
