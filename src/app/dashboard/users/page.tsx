import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import UserListingClient from '@/features/user/user-listing';
import UserTableAction from '@/features/user/component/user-table-action';

interface PageProps {
  searchParams: SearchParams;
}

export default async function Page({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const search = Array.isArray(searchParams.q)
    ? searchParams.q[0]
    : searchParams.q || '';
  const limit = (await Number(searchParams.limit)) || 10;

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Users' description='Manage users' />
          <Link
            href='/dashboard/users/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Link>
        </div>
        <Separator />
        <UserTableAction />
        <UserListingClient
          initialPage={page}
          initialSearch={search}
          initialLimit={limit}
        />
      </div>
    </PageContainer>
  );
}
