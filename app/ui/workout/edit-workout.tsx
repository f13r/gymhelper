import { FormInput } from '@/app/ui/form/form-input';
import { Tag } from '@prisma/client';
import { FormSelect } from '@/app/ui/form/form-select';

export const EditWorkout = ({
  control,
  onChange,
  tags,
}: {
  control: any;
  onChange: () => void;
  tags: Tag[];
}) => {
  return (
    <div className="flex max-w-[365px] flex-col items-center justify-center py-4">
      <div className="flex w-full flex-col justify-center gap-8">
        <div>
          <FormInput
            control={control}
            label="Назва"
            type="string"
            name="title"
            onChange={onChange}
          />
        </div>
        <div className="flex w-fit grow-0 gap-2">
          <FormSelect
            label="Тег"
            control={control}
            onChange={onChange}
            name="tagId"
            items={tags}
          />
          <FormInput
            control={control}
            label="Підходи"
            variant="flat"
            name="defaultSetCount"
            type="number"
            onChange={onChange}
          />
          <FormInput
            label="Повтори"
            control={control}
            variant="flat"
            name="defaultRepCount"
            type="number"
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};
