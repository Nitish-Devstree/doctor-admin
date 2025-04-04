'use client';

import { DataTable as ScholarshipTable } from '@/components/ui/table/data-table';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useGetAllScholarship } from '@/hook-api/scholarship/scholarship.hook';
import { useSearchParams } from 'next/navigation';
import { columns } from './component/columns';

export default function ScholarshipListPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const search = searchParams.get('q');
  const limit = searchParams.get('limit') ?? 10;

  const filters = {
    page: Number(page),
    limit: Number(limit),
    ...(search && { search: search })
  };

  const { data: scholarshipData, isLoading } = useGetAllScholarship(filters);
  if (isLoading) {
    return <DataTableSkeleton columnCount={6} rowCount={10} />;
  }

  return (
    <ScholarshipTable
      columns={columns}
      data={scholarshipData?.scholarships || []}
      totalItems={scholarshipData?.totalScholarships || 0}
    />
  );
}
