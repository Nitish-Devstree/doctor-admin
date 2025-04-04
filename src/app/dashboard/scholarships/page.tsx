import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { ScholarshipTableAction } from '@/features/scholarship/component/scholarship-table-action';
import ScholarshipListPage from '@/features/scholarship/scholarship-listing';
import { cn } from '@/lib/utils';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Plus } from 'lucide-react';
import Link from 'next/link';
export default async function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Scholarship' description='Manage scholarships' />
          <Link
            href='/dashboard/scholarships/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Link>
        </div>
        <Separator />
        <ScholarshipTableAction />
        <ScholarshipListPage />
      </div>
    </PageContainer>
  );
}
