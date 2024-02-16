'use client';

import React from 'react';
import { transformForDateInput, transformForRoute } from '@/app/lib/utils/date';
import { useRouter } from 'next/navigation';

export const DateInput = ({ dateString }: { dateString: string }) => {
  const { push } = useRouter();
  const dateInput = transformForDateInput(dateString);

  const changeDateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    push('/training/1/' + transformForRoute(new Date(event.target.value)));
  };

  return (
    <input
      type="date"
      className="bg-gray-50"
      defaultValue={dateInput}
      onChange={changeDateHandler}
    />
  );
};
