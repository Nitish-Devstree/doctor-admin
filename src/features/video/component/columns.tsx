'use client';

import { Video } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Video>[] = [
  {
    accessorKey: 'thumbnail',
    header: 'Thumbnail',
    cell: ({ row }) => {
      return (
        <div className='relative aspect-square'>
          <Image
            src={row.getValue('thumbnail')}
            alt={row.getValue('title') || 'Video'}
            fill
            className='rounded-lg object-cover'
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'videoUrl',
    cell: ({ row }) => {
      return (
        <Link href={row.original.videoUrl} target='_blank'>
          {row.original.videoUrl}
        </Link>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
