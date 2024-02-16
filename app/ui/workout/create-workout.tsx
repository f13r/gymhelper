'use client';

import { useEffect, useState } from 'react';
import { Tag, Workout } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { FormInput } from '@/app/ui/form/form-input';
import { Button } from '@nextui-org/button';
import { addWorkout } from '@/app/lib/actions/workouts';
import { FormSelect } from '@/app/ui/form/form-select';

const newWorkoutDefaultName = 'Нова вправа';

export const CreateWorkout = ({ tags }: { tags: Tag[] }) => {
  const { setFocus, control, getValues, reset } = useForm<Workout>();
  const [newWorkoutName, setNewWorkoutName] = useState(newWorkoutDefaultName);
  const [addingWorkout, setAddingWorkout] = useState(false);

  const addWorkoutHandler = async () => {
    if (addingWorkout) {
      await addWorkout(getValues());
      setAddingWorkout(false);
      reset();
    } else {
      setAddingWorkout(true);
    }
  };

  useEffect(() => {
    if (addingWorkout) {
      setFocus('title');
    }
  }, [addingWorkout, setFocus]);

  return (
    <div className="flex max-w-[365px] flex-col items-center justify-center">
      {addingWorkout && (
        <div className="flex max-w-[365px] flex-col items-center justify-center py-4">
          <h1 className="mb-8 text-xl">{newWorkoutName}</h1>
          <div className="flex w-full flex-col justify-center gap-8">
            <div>
              <FormInput
                control={control}
                onChange={(value) => {
                  setNewWorkoutName(
                    value.length ? value : newWorkoutDefaultName,
                  );
                }}
                label="Назва"
                type="string"
                name="title"
              />
            </div>
            <div className="flex w-fit grow-0 gap-2">
              <FormSelect
                label="Тег"
                control={control}
                name="tagId"
                items={tags}
              />
              <FormInput
                control={control}
                label="Підходи"
                variant="flat"
                name="defaultSetCount"
                type="number"
              />
              <FormInput
                label="Повтори"
                control={control}
                variant="flat"
                name="defaultRepCount"
                type="number"
              />
            </div>
          </div>
        </div>
      )}
      <div className="my-4 flex gap-4">
        <Button color={'primary'} onClick={addWorkoutHandler}>
          {!addingWorkout ? 'Додати нову вправу' : 'Зберегти вправу'}
        </Button>
        {addingWorkout && (
          <Button
            color="default"
            onClick={() => {
              setAddingWorkout(false);
            }}
          >
            Відмінити
          </Button>
        )}
      </div>
    </div>
  );
};
