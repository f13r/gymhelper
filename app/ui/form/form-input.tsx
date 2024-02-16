import React from 'react';

import { Controller } from 'react-hook-form';
import { Input } from '@nextui-org/input';

type FormInputType = 'string' | 'number';

export type OnChangeReturnByType<T extends FormInputType> = T extends 'string'
  ? string
  : T extends 'number'
    ? number
    : never;

export const FormInput = <T extends FormInputType = FormInputType>({
  control,
  name,
  label,
  defaultValue,
  onChange,
  type,
  color,
  variant,
  className,
}: {
  control: any;
  name: string;
  label: string;
  defaultValue?: number | string;
  type: T;
  onChange?: (value: OnChangeReturnByType<T>) => void;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined;
  variant?: 'flat' | 'faded' | 'bordered' | 'underlined' | undefined;
  className?: string;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <Input
            type={type}
            color={color}
            variant={variant}
            label={label}
            size="sm"
            className={className}
            {...field}
            value={field?.value?.toString()}
            onChange={async (event) => {
              if (type === 'number') {
                field.onChange(parseInt(event.target.value, 10));
                onChange?.(
                  parseInt(event.target.value, 10) as OnChangeReturnByType<T>,
                );
              } else {
                field.onChange(event.target.value);
                onChange?.(event.target.value as OnChangeReturnByType<T>);
              }
            }}
          />
        );
      }}
    />
  );
};
