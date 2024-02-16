import { CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import React, { useMemo } from 'react';
import { FieldArrayWithId } from 'react-hook-form';
import { Exercise, Rep } from '@/app/ui/training/types';
import { updateRepAction } from '@/app/lib/actions';
import { NumberPicker } from '@/app/ui/form/number-picker';
import { LastRep } from '@/app/ui/training/exercise/body/last-rep';

export const ExerciseBody = ({
  lastExercise,
  fields,
  values,
  control,
  reps,
}: {
  lastExercise?: Exercise;
  fields: FieldArrayWithId<Exercise, 'reps', 'key'>[];
  values: Exercise;
  control: any;
  reps: Rep[];
}) => {
  const { defaultRepCount } = values;

  const lastReps = useMemo(
    () => lastExercise?.reps ?? [],
    [lastExercise?.reps],
  );

  let allWeight = reps.reduce((acc, { count, weight }) => {
    if (!count || !weight) {
      return acc;
    }

    return count * weight + acc;
  }, 0);

  const allPreviousWeight = useMemo(
    () =>
      lastReps.reduce((acc, { count, weight }) => {
        if (!count || !weight) {
          return acc;
        }

        return count * weight + acc;
      }, 0),
    [lastReps],
  );

  let allWeightClassName = 'text-default-500';
  let sign = '';

  if (allPreviousWeight) {
    if (allWeight > allPreviousWeight) {
      sign = '+';
      allWeightClassName = 'text-blue-500';
    } else if (allWeight < allPreviousWeight) {
      allWeightClassName = 'text-danger-500';
    } else {
      allWeightClassName = 'text-default-500';
      sign = '';
    }
    allWeight = allWeight - allPreviousWeight;
  }

  return (
    !!fields.length && (
      <CardBody>
        <div className="flex justify-between gap-4 text-default-500">
          <div className="ml-10">Вага</div>
          <div className="mr-8">Повтори</div>
        </div>
        <Divider className="mt-3" />
        {fields.map((field, index) => {
          const updateRep = async () => {
            const repToUpdate = reps[index];
            await updateRepAction(repToUpdate);
          };

          return (
            <div key={field.key}>
              <div className="my-3 ml-2 mr-8 flex justify-between">
                <div className="flex grow-0 items-center justify-center gap-2 text-2xl">
                  <div className="text-base text-default-300">{index + 1}.</div>
                  <NumberPicker
                    name={`reps.${index}.weight`}
                    control={control}
                    defaultValue={reps?.[index]?.weight}
                    onChange={updateRep}
                    length={200}
                  />
                </div>
                {lastExercise && (
                  <LastRep
                    lastExercise={lastExercise}
                    index={index}
                    reps={reps}
                  />
                )}
                <div className="flex grow-0 items-center justify-center gap-4 text-2xl">
                  <NumberPicker
                    name={`reps.${index}.count`}
                    // @ts-ignore
                    control={control}
                    defaultValue={reps?.[index]?.count ?? defaultRepCount ?? 10}
                    onChange={updateRep}
                    length={200}
                  />
                </div>
              </div>
              {!(index !== 0 && index === fields.length - 1) ||
                (fields.length === 1 && <Divider />)}
            </div>
          );
        })}
        <div className="mt-8 flex items-center justify-center gap-2 text-blue-500">
          <span className={`${allWeightClassName}`}>
            {sign}
            {allWeight} кг
          </span>
          {lastExercise && (
            <span className="text-default-500">({allPreviousWeight} кг)</span>
          )}
        </div>
      </CardBody>
    )
  );
};
