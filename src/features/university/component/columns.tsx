'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { University } from '@/constants/data';

export const columns: ColumnDef<University>[] = [
  {
    accessorKey: 'image',
    header: 'IMAGE',
    cell: ({ row }) => {
      return (
        <div className='relative aspect-square'>
          <Image
            src={row.getValue('image')}
            alt={row.getValue('name') || 'University'}
            fill
            className='rounded-lg object-cover'
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'location.country',
    header: 'Country'
  },
  {
    accessorKey: 'location.city',
    header: 'City'
  },
  {
    accessorKey: 'establishedYear',
    header: 'Established Year'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
