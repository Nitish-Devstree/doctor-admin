'use client';

import { Quiz } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { ResultOutAction } from './result-out-action';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { format } from 'date-fns';

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
    accessorKey: 'quizStartDatetime',
    header: 'Start Date and Time',
    cell: ({ row }) => {
      return row?.original?.quizStartDatetime ? (
        <p>{format(row?.original?.quizStartDatetime, 'dd/MM/yyyy hh:mm aa')}</p>
      ) : (
        ''
      );
    }
  },
  {
    accessorKey: 'quizEndDatetime',
    header: 'End Date and Time',
    cell: ({ row }) => {
      return row?.original?.quizEndDatetime ? (
        <p>{format(row?.original?.quizEndDatetime, 'dd/MM/yyyy hh:mm aa')}</p>
      ) : (
        ''
      );
    }
  },
  {
    accessorKey: 'viewResult',
    header: 'View Result',
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/quiz-result/${row.original._id}`}
          className={cn(buttonVariants(), 'text-xs md:text-sm')}
        >
          View Result
        </Link>
      );
    }
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
