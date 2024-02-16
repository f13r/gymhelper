import React from 'react';
import { Exercise, Rep } from '@/app/ui/training/types';

export const LastRep = ({
  lastExercise,
  index,
  reps,
}: {
  lastExercise: Exercise;
  index: number;
  reps: Rep[];
}) => {
  const lastWeight = lastExercise.reps[index]?.weight ?? 0;
  const lastCount = lastExercise.reps[index]?.count ?? 0;
  const currentWeight = reps[index]?.weight ?? 0;
  const currentCount = reps[index]?.count ?? 0;

  const diff = currentWeight * currentCount - lastWeight * lastCount;

  const diffClassName = diff > 0 ? 'text-blue-500' : 'text-danger-500';

  return (
    diff !== 0 && (
      <div className="flex w-36 items-center justify-between gap-4">
        <div className="text-base text-default-300">{lastWeight}</div>
        <div className={`flex items-center text-base ${diffClassName}`}>
          {diff} кг
        </div>
        <div className="text-base text-default-300">{lastCount}</div>
      </div>
    )
  );
};
