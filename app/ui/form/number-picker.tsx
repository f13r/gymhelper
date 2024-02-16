import { Controller, FieldValues, PathValue, Path } from 'react-hook-form';
import Picker from 'react-mobile-picker';
import React from 'react';

export const NumberPicker = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  onChange,
  length,
}: {
  name: Path<T>;
  control: any;
  defaultValue: PathValue<T, Path<T>>;
  onChange: () => void;
  length: number;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <Picker
            wheelMode="normal"
            height={160}
            itemHeight={70}
            marginHeight={20}
            value={{
              weight: field.value?.toString() ?? '',
            }}
            onChange={async ({ weight }) => {
              field.onChange(Number(weight));
              onChange();
            }}
          >
            <Picker.Column key="weight" name="weight">
              {Array.from({ length }, (_, i) => `${i}`).map((item) => (
                <Picker.Item key={item} value={item} className="text-4xl">
                  {({ selected }) => (
                    <div
                      className={
                        selected
                          ? 'font-semibold text-default-700'
                          : 'text-neutral-400'
                      }
                    >
                      {item}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        );
      }}
    />
  );
};
