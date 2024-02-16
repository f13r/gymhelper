import { Progress } from '@nextui-org/progress';
import React from 'react';

export const Footer = ({
  done,
  all,
  totalWeight,
}: {
  done: number;
  all: number;
  totalWeight: number;
}) => {
  return (
    <footer className="sticky bottom-0 z-20 flex h-auto w-full items-center justify-center bg-background p-2 pb-3 shadow-medium">
      <Progress
        classNames={{
          base: 'max-w-md',
          track: 'drop-shadow-md border border-default',
          indicator: 'bg-gradient-to-r from-blue-500 to-yellow-500',
          label: 'tracking-wider font-medium text-default-600 w-full',
          value: 'text-foreground/60',
        }}
        label={
          <div className="flex w-full items-center justify-between">
            <div>
              {done}/{all}
            </div>
            <div>{totalWeight} кг</div>
          </div>
        }
        value={Math.round((done / all) * 100)}
        className="max-w-md"
      />
    </footer>
  );
};
