'use client';

import { Select, SelectItem } from '@nextui-org/select';
import React, { ChangeEvent, useState } from 'react';
import { createTraining, Plans } from '@/app/lib/actions';
import { Button } from '@nextui-org/button';
import { PlusFilledIcon } from '@nextui-org/shared-icons';
import { transformForDateInput } from '@/app/lib/utils/date';

export const NewTraining = ({
  plans,
  dateString,
}: {
  plans: Plans;
  dateString: string;
}) => {
  const [plan, setPlan] = useState('');
  const date = new Date(transformForDateInput(dateString));

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPlan(e.target.value);
  };

  const addNewTraining = async () => {
    await createTraining(date, 1, Number(plan));
  };

  return (
    <div className="mt-8 flex w-[calc(95vw)] flex-col items-center sm:min-w-[350px] sm:max-w-[350px]">
      <Select
        selectedKeys={[plan]}
        onChange={handleSelectionChange}
        color="primary"
        label="Виберіть тренування:"
      >
        {plans.map(({ id, title }) => (
          <SelectItem key={id} value={id}>
            {title}
          </SelectItem>
        ))}
      </Select>

      <Button
        color="primary"
        className="mt-8"
        size="lg"
        startContent={<PlusFilledIcon />}
        onClick={addNewTraining}
      >
        Створити тренування
      </Button>
    </div>
  );
};
