'use client';

import { Scholarship } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Scholarship>[] = [
  
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'websiteUrl',
    header: 'Website URL',
    cell: ({ row }) => (
      <a 
        href={row.original.websiteUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 hover:underline"
      >
        {row.original.websiteUrl}
      </a>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
