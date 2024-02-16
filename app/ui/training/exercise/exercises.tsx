import React from 'react';
import { Exercise } from '@/app/ui/training/types';
import { ExerciseComponent } from '@/app/ui/training/exercise/exercise';

export type ExercisesProps = {
  exercises?: Exercise[];
  lastExercises?: Exercise[];
  showAll: boolean;
};
export const Exercises: React.FC<ExercisesProps> = ({
  exercises,
  lastExercises,
  showAll,
}) => {
  return exercises ? (
    exercises
      .filter((e) => {
        if (showAll) {
          return true;
        }

        return !e.done;
      })
      .map((e, index) => {
        return (
          <ExerciseComponent
            key={e.id}
            first={index === 0}
            last={index === exercises.length - 1}
            only={exercises.length === 1}
            exercise={e}
            lastExercise={lastExercises?.find(
              (l) => l.workoutId === e.workoutId,
            )}
          />
        );
      })
  ) : (
    <div className="mt-5">На цей день не було заплановане тренування</div>
  );
};
