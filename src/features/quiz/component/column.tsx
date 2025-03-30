'use client';

import { Quiz } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { ResultOutAction } from './result-out-action';

export const columns: ColumnDef<Quiz>[] = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'totalMarks',
    header: 'Total Marks'
  },
  {
    accessorKey: 'timeLimit',
    header: 'Time Limit'
  },
  {
    accessorKey: 'questionCount',
    header: 'Question Count'
  },
  {
    id: 'resultOut',
    header: 'Result Out',
    cell: ({ row }) => <ResultOutAction data={row.original} />
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
