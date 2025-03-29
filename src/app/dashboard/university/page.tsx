import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import UniversityTableAction from '@/features/university/component/university-table-action';
import UniversityListPage from '@/features/university/university-list-page';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';

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
          <Heading title='University' description='Manage university' />
          <Link
            href='/dashboard/university/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Link>
        </div>
        <Separator />
        <UniversityTableAction />
        <UniversityListPage />
      </div>
    </PageContainer>
  );
}
