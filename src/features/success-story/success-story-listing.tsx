'use client';

import { useDebounce } from '@/hooks/use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { columns } from './component/columns';
import { DataTable as SuccessStoryTable } from '@/components/ui/table/data-table';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useGetAllSuccessStory } from '@/hook-api/success-story/success-story.hook';

export default function SuccessStoryListPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const search = searchParams.get('q');
  const limit = searchParams.get('limit') ?? 10;

  const filters = {
    page: Number(page),
    limit: Number(limit),
    ...(search && { search: search })
  };

  const { data: successStoryData, isLoading } = useGetAllSuccessStory(filters);
  if (isLoading) {
    return <DataTableSkeleton columnCount={6} rowCount={10} />;
  }

  return (
    <SuccessStoryTable
      columns={columns}
      data={successStoryData?.successStories || []}
      totalItems={successStoryData?.pagination?.total || 0}
    />
  );
}
