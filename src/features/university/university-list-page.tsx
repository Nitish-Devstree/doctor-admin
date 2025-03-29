'use client';

import { useGetUniversities } from '@/hook-api/university/university.hook';
import { useDebounce } from '@/hooks/use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { columns } from './component/columns';
import { DataTable as UnversityTable } from '@/components/ui/table/data-table';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';

export default function UniversityListPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const search = searchParams.get('q');
  const limit = searchParams.get('limit') ?? 10;
  const country = searchParams.get('country');

  const filters = {
    page: Number(page),
    limit: Number(limit),
    ...(search && { name: search }),
    ...(country && { country: country })
  };

  const { data: universitiesData, isLoading } = useGetUniversities(filters);
  console.log(universitiesData, 'universitiesData');
  if (isLoading) {
    return <DataTableSkeleton columnCount={6} rowCount={10} />;
  }

  return (
    <UnversityTable
      columns={columns}
      data={universitiesData?.universities || []}
      totalItems={universitiesData?.totalCount || 0}
    />
  );
}
