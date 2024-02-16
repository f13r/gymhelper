'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { EditWorkout } from '@/app/ui/workout/edit-workout';
import { Tag } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { getBgColorByTag, getTextColorByTag } from '@/app/ui/training/utils';
import { editWorkout, WorkoutWithTag } from '@/app/lib/actions/workouts';

export const WorkoutItem = ({
  workout,
  tags,
}: {
  workout: WorkoutWithTag;
  tags: Tag[];
}) => {
  const { control, watch, getValues } = useForm({
    defaultValues: workout,
  });

  const { title, tagId, defaultRepCount, defaultSetCount } = watch();

  const onChange = async () => {
    await editWorkout(getValues());
  };

  const currentTag = tags.find((tag) => {
    return tag.id === tagId;
  });

  return (
    <Accordion
      variant="splitted"
      selectionMode="multiple"
      itemClasses={{
        base: 'py-0 w-full',
        title: 'text-base',
      }}
    >
      <AccordionItem
        aria-label={title}
        title={title}
        className={`${getBgColorByTag(tagId!)} ${getTextColorByTag(tagId!)}`}
        subtitle={
          <div className="flex w-full justify-between text-xs text-primary">
            <div>{currentTag?.title}</div>
            <div>
              {defaultSetCount} / {defaultRepCount}
            </div>
          </div>
        }
      >
        <EditWorkout control={control} onChange={onChange} tags={tags} />
      </AccordionItem>
    </Accordion>
  );
};
