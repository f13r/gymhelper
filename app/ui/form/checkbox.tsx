import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Checkbox, cn } from '@nextui-org/react';
import React, { memo } from 'react';

export const CheckBoxComponent = <T extends FieldValues>({
  name,
  control,
  onChange,
}: {
  name: Path<T>;
  control: Control<T>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <Checkbox
        onChange={async (event) => {
          field.onChange(event);
          onChange(event);
        }}
        isSelected={field.value}
        radius="full"
        color="primary"
        classNames={{
          wrapper: cn('bg-gray-50'),
        }}
      />
    )}
  />
);

export const CheckBox = memo(CheckBoxComponent);
