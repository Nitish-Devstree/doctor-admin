'use client';
import { useGetAllUsers } from '../../hook-api/user/user.hook';
import { useQueryState } from 'nuqs';
import React from 'react';
import { DataTable as UserTable } from '../../components/ui/table/data-table';
import { DataTableSkeleton } from '../../components/ui/table/data-table-skeleton';
import { columns } from './component/columns';
import { useSearchParams } from 'next/navigation';

interface UserListingClientProps {
  initialPage?: number;
  initialSearch?: string;
  initialLimit?: number;
}

const UserListingClient = ({
  initialPage,
  initialSearch,
  initialLimit
}: UserListingClientProps) => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const search = searchParams.get('q');
  const limit = searchParams.get('limit') ?? 10;

  const filters = {
    page: Number(page),
    limit: Number(limit),
    ...(search && { name: search })
  };

  const { data: userData, isLoading } = useGetAllUsers(filters);

  if (isLoading) {
    return <DataTableSkeleton columnCount={6} rowCount={10} />;
  }

  return (
    <UserTable
      columns={columns}
      data={userData?.data || []}
      totalItems={userData?.totalCount || 0}
    />
  );
};

export default UserListingClient;
