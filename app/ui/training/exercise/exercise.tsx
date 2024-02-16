'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Card } from '@nextui-org/card';
import { Exercise } from '@/app/ui/training/types';
import { ExerciseHeader } from '@/app/ui/training/exercise/header/exercise-header';
import { ExerciseFooter } from '@/app/ui/training/exercise/footer/exercise-footer';
import { ExerciseBody } from '@/app/ui/training/exercise/body/exercise-body';
import { updateExerciseAction } from '@/app/lib/actions';
import { Skeleton } from '@nextui-org/skeleton';

export function ExerciseComponent({
  first,
  last,
  only,
  exercise,
  lastExercise,
}: {
  first: boolean;
  last: boolean;
  only: boolean;
  exercise: Exercise;
  lastExercise?: Exercise;
}) {
  const [loaded, setLoaded] = useState(false);
  const { control, getValues, watch } = useForm<Exercise>({
    values: exercise,
  });

  const { fields, append, remove } = useFieldArray<Exercise, 'reps', 'key'>({
    control,
    name: 'reps',
    keyName: 'key',
    shouldUnregister: true,
  });
  const values = getValues();
  const [reps, order] = watch(['reps', 'order']);

  const updateExercise = useCallback(async () => {
    await updateExerciseAction(getValues());
  }, [getValues]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Card
      className="my-4 w-[calc(95vw)] sm:min-w-[350px] sm:max-w-[350px] "
      shadow="md"
    >
      {loaded ? (
        <>
          <ExerciseHeader
            first={first}
            control={control}
            last={last}
            values={values}
            only={only}
            remove={remove}
            updateExercise={updateExercise}
            order={order}
          />
          <ExerciseBody
            control={control}
            lastExercise={lastExercise}
            values={values}
            fields={fields}
            reps={reps}
          />
          <ExerciseFooter append={append} values={values} />
        </>
      ) : (
        <Skeleton className="rounded-lg">
          <div className="h-[960px] rounded-lg bg-default-300"></div>
        </Skeleton>
      )}
    </Card>
  );
}
