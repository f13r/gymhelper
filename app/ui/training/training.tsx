import React from 'react';

import { Exercise, ExerciseWeight } from '@/app/ui/training/types';
import { Exercises } from '@/app/ui/training/exercise/exercises';
import { Plans } from '@/app/lib/actions';
import { NewTraining } from '@/app/ui/training/new-training';
import { Footer } from '@/app/ui/training/footer';
import { EndTraining } from '@/app/ui/training/end-training';
import { DateInput } from '@/app/ui/training/date-input';
import { ShowDoneCheckbox } from '@/app/ui/training/show-done-checkbox';

export default function TrainingComponent({
  date,
  exercises,
  plans,
  lastExercises,
  lastWeight,
  currentWeight,
  showAll,
}: {
  date: string;
  exercises?: Exercise[];
  plans: Plans;
  showAll: boolean;
  lastExercises?: Exercise[];
  lastWeight?: ExerciseWeight;
  currentWeight?: ExerciseWeight;
}) {
  const all = exercises?.length ?? 0;
  const done = exercises?.filter((e) => e.done)?.length ?? 0;
  const allDone = !showAll && all === done;

  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-gray-50">
        <h2 className="mb-2 mt-8 text-2xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          <ShowDoneCheckbox />
          <DateInput dateString={date} />
        </h2>

        <Exercises
          exercises={exercises}
          lastExercises={lastExercises}
          showAll={showAll}
        />

        {!exercises && <NewTraining dateString={date} plans={plans} />}
        {allDone && exercises && !showAll && currentWeight && (
          <EndTraining currentWeight={currentWeight} lastWeight={lastWeight} />
        )}
      </div>

      {exercises && !allDone && currentWeight && (
        <Footer done={done} all={all} totalWeight={currentWeight.totalWeight} />
      )}
    </>
  );
}
