'use client';

import { createPlan, Workouts } from '@/app/lib/actions';
import { CheckboxGroup, Checkbox } from '@nextui-org/checkbox';
import { Input } from '@nextui-org/input';
import React, { useState } from 'react';
import { Button } from '@nextui-org/button';
import { PlusFilledIcon } from '@nextui-org/shared-icons';

export const NewProgram = ({ workouts }: { workouts: Workouts }) => {
  const [programName, setProgramName] = useState('');
  const [workoutSelected, setWorkoutSelected] = useState<string[]>([]);

  const addNewProgram = async () => {
    await createPlan(
      programName,
      1,
      workoutSelected.map((selected) => Number(selected)),
    );
  };

  return (
    <div className="mt-8 flex w-full flex-col items-center gap-6">
      <div className="w-max-[300px] flex flex-col items-center gap-6 px-6">
        <Input
          value={programName}
          onChange={(event) => setProgramName(event.target.value)}
          variant="flat"
          label="Назва нової програми"
        />
        <CheckboxGroup
          value={workoutSelected}
          onValueChange={setWorkoutSelected}
          label="Виберіть вправи:"
        >
          {workouts.map(({ id, title, Tag }) => {
            return (
              <Checkbox key={id} value={id.toString()}>
                {title} <span className="text-blue-500"> ({Tag?.title}) </span>
              </Checkbox>
            );
          })}
        </CheckboxGroup>
        <Button
          color="primary"
          className="mt-6"
          size="lg"
          startContent={<PlusFilledIcon />}
          onClick={addNewProgram}
        >
          Створити програму
        </Button>
      </div>
    </div>
  );
};
