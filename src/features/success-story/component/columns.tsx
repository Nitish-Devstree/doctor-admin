'use client';

import { SuccessStory } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

export const columns: ColumnDef<SuccessStory>[] = [
  {
    accessorKey: 'thumbnail',
    header: 'Thumbnail',
    cell: ({ row }) => (
      <div className='relative h-20 w-20'>
        <Image
          src={row.original.thumbnail}
          alt={row.original.title}
          fill
          className='rounded object-cover'
        />
      </div>
    )
  },
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'videoUrl',
    header: 'Video URL',
    cell: ({ row }) => (
      <a
        href={row.original.videoLink}
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-600 hover:underline'
      >
        {row.original.videoLink}
      </a>
    )
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
