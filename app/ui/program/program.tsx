'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from '@nextui-org/react';
import { EditIcon } from '@nextui-org/shared-icons';
import DeleteIcon from '@/app/ui/icons/delete';
import { PlansType } from '@/app/program/page';
import { Prisma } from '@prisma/client';

const columns = [
  { name: 'Програма', uid: 'title' },
  { name: "Групи м'язів", uid: 'tags' },
  { name: '', uid: 'actions' },
];

export default function Program({ plans }: { plans: PlansType }) {
  const renderCell = React.useCallback(
    (plan: PlansType[number], columnKey: Prisma.Key) => {
      const cellValue = plan[columnKey as keyof PlansType[number]];

      switch (columnKey) {
        case 'title':
          return <div>{plan.title}</div>;
        case 'tags':
          return (
            <div className="flex flex-col">
              {plan.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          );
        case 'actions':
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Редагувати програму">
                <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Видалити програму">
                <span className="cursor-pointer text-lg text-danger active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <div className="flex items-center justify-center">
      <Table className="my-4 w-[calc(95vw)] sm:min-w-[350px] sm:max-w-[350px] ">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={plans}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
