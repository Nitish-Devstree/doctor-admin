'use client';

import { useGetUniversities } from '@/hook-api/university/university.hook';
import { useDebounce } from '@/hooks/use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { columns } from './component/columns';
import { DataTable as VideoTable } from '@/components/ui/table/data-table';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useGetAllVideo } from '@/hook-api/video/video.hook';

export default function VideoListPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const search = searchParams.get('q');
  const limit = searchParams.get('limit') ?? 10;

  const filters = {
    page: Number(page),
    limit: Number(limit),
    ...(search && { name: search })
  };

  const { data: videoData, isLoading } = useGetAllVideo(filters);
  if (isLoading) {
    return <DataTableSkeleton columnCount={6} rowCount={10} />;
  }

  return (
    <VideoTable
      columns={columns}
      data={videoData?.videos || []}
      totalItems={videoData?.totalCount || 0}
    />
  );
}
