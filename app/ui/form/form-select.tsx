import { Select, SelectItem } from '@nextui-org/select';
import { Controller } from 'react-hook-form';

export const FormSelect = ({
  label,
  control,
  name,
  items,
  onChange,
}: {
  name: string;
  control: any;
  label: string;
  items: Array<{ id: string | number; title: string }>;
  onChange?: (value: number) => void;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Select
            label={label}
            size="sm"
            fullWidth
            defaultSelectedKeys={[field.value?.toString() ?? '']}
            onChange={async (event) => {
              field.onChange(parseInt(event.target.value, 10));
              onChange?.(parseInt(event.target.value, 10));
            }}
          >
            {items.map((item) => {
              return (
                <SelectItem key={item.id.toString()} value={item.id.toString()}>
                  {item.title}
                </SelectItem>
              );
            })}
          </Select>
        );
      }}
    />
  );
};
