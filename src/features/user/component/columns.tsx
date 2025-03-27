'use client';
import { User } from '../../../constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { formatDistanceToNow } from 'date-fns';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'avatar',
    header: 'IMAGE',
    cell: ({ row }) => {
      return (
        <div className='relative aspect-square'>
          <Image
            src={row.getValue('avatar')}
            alt={row.getValue('phoneNumber') || 'User'}
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
    accessorKey: 'phoneNumber',
    header: 'PHONE NUMBER'
  },
  {
    accessorKey: 'email',
    header: 'EMAIL'
  },
  {
    accessorKey: 'createdAt',
    header: 'CREATED AT',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return formatDistanceToNow(date, { addSuffix: true });
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
