'use client';

import { Checkbox } from '@nextui-org/react';
import React from 'react';
import { useQueryState } from 'nuqs';

export const ShowDoneCheckbox = () => {
  const [showAll, setShowAll] = useQueryState('showAll', {
    shallow: false,
  });

  return (
    <Checkbox
      isSelected={!!showAll}
      radius="full"
      color="primary"
      onChange={(event) => {
        setShowAll(event.target.checked ? '1' : null);
      }}
    />
  );
};
