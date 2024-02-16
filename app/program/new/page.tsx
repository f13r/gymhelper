import React from 'react';
import { Workouts } from '@/app/lib/actions';
import { NewProgram } from '@/app/ui/program/new-program';
import { fetchWorkouts } from '@/app/lib/actions/workouts';

export default async function Page() {
  const workouts: Workouts = await fetchWorkouts('tagId');

  return <NewProgram workouts={workouts} />;
}
