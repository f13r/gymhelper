import { CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { addRepAction, findLastRepByWorkout } from '@/app/lib/actions';
import { PetBoldIcon } from '@nextui-org/shared-icons';
import React from 'react';
import { Exercise } from '@/app/ui/training/types';
import { UseFieldArrayAppend } from 'react-hook-form';
import { getBgColorByTag, getTextColorByTag } from '@/app/ui/training/utils';

export const ExerciseFooter = ({
  append,
  values,
}: {
  append: UseFieldArrayAppend<Exercise, 'reps'>;
  values: Exercise;
}) => {
  const {
    id: exerciseId,
    workoutId,
    trainingId,
    defaultRepCount,
    defaultSetCount,
    defaultWeight,
    reps,
    tagId,
  } = values;

  const clickHandler = async () => {
    const nextOrder = reps.length + 1;

    const lastRep = await findLastRepByWorkout(
      workoutId,
      trainingId,
      nextOrder,
    );

    const newRep = {
      count: lastRep?.count ?? defaultRepCount ?? undefined,
      order: nextOrder,
      weight: lastRep?.weight ?? defaultWeight,
    };

    const newRepId = await addRepAction(exerciseId, newRep);

    append({ ...newRep, id: newRepId });
  };

  return (
    <CardFooter
      className={`flex justify-center bg-blue-200 ${getBgColorByTag(tagId!)}`}
    >
      <Button
        onClick={clickHandler}
        className={getTextColorByTag(tagId!)}
        color="default"
        variant="light"
        size="lg"
        startContent={<PetBoldIcon />}
      >
        Додати підхід ({reps.length ?? 0}/{defaultSetCount ?? 0})
      </Button>
    </CardFooter>
  );
};
