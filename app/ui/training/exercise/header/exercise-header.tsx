import { CardHeader } from '@nextui-org/card';
import { CheckBox } from '@/app/ui/form/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { UseFieldArrayRemove } from 'react-hook-form';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import {
  AdjustmentsHorizontalIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { Exercise } from '@/app/ui/training/types';
import { removeRepAction } from '@/app/lib/actions';
import { iconClasses } from '@/app/ui/training/exercise/consts';
import { getBgColorByTag, getTextColorByTag } from '@/app/ui/training/utils';
import { FormInput } from '@/app/ui/form/form-input';
import { DeleteIcon } from '@nextui-org/shared-icons';
import { reorderExercise } from '@/app/lib/actions/exercises';

export const ExerciseHeader = ({
  first,
  last,
  only,
  control,
  values,
  remove,
  updateExercise,
  order,
}: {
  first: boolean;
  last: boolean;
  only: boolean;
  control: any;
  remove: UseFieldArrayRemove;
  values: Exercise;
  updateExercise: () => void;
  order: number;
}) => {
  const { id, trainingId, tagId, title, defaultWeight, reps } = values;

  const liftUp = async () => {
    await reorderExercise(id, trainingId, order, order - 1);
  };

  const dropDown = async () => {
    await reorderExercise(id, trainingId, order, order + 1);
  };

  return (
    <CardHeader
      className={`justify-between pl-6 pr-6 text-white ${getBgColorByTag(tagId!)} ${getTextColorByTag(tagId!)}`}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center font-bold">
          <CheckBox
            name="done"
            // @ts-ignore
            control={control}
            onChange={updateExercise}
          />
          <Popover>
            <PopoverTrigger className="max-w-42 flex cursor-pointer items-center gap-2 truncate whitespace-break-spaces text-sm font-semibold">
              {title}
            </PopoverTrigger>
            <PopoverContent className="px-1 py-2">
              <div className="">{title}</div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12">
            <FormInput
              control={control}
              name="defaultWeight"
              defaultValue={defaultWeight}
              type="number"
              onChange={updateExercise}
              label="Кг"
            />
          </div>
          <div>
            <Dropdown placement="left-start">
              <DropdownTrigger className="cursor-pointer">
                <AdjustmentsHorizontalIcon className="min-w-8 max-w-8 " />
              </DropdownTrigger>
              <DropdownMenu aria-label="menu" variant="faded">
                <DropdownItem
                  onClick={liftUp}
                  isDisabled={first || only}
                  startContent={
                    <div className={iconClasses}>
                      <ArrowUpIcon />
                    </div>
                  }
                >
                  Вверх
                </DropdownItem>
                <DropdownItem
                  isDisabled={last || only}
                  onClick={dropDown}
                  startContent={
                    <div className={iconClasses}>
                      <ArrowDownIcon />
                    </div>
                  }
                >
                  Вниз
                </DropdownItem>
                <DropdownItem
                  isDisabled={!reps?.length}
                  startContent={
                    <div className={iconClasses}>
                      <DeleteIcon />
                    </div>
                  }
                  onClick={async () => {
                    if (reps.length) {
                      const [lastRep] = reps.slice(-1);
                      await removeRepAction(lastRep.id);
                      remove(reps.length - 1);
                    }
                  }}
                >
                  Видалити останній підхід
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </CardHeader>
  );
};
