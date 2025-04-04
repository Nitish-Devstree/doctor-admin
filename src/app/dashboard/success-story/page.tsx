import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { SuccessStoryTableAction } from '@/features/success-story/component/success-story-table-action';
import SuccessStoryListPage from '@/features/success-story/success-story-listing';
import { cn } from '@/lib/utils';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Plus } from 'lucide-react';
import Link from 'next/link';
export default async function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Success Story' description='Manage success stories' />
          <Link
            href='/dashboard/success-story/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Link>
        </div>
        <Separator />
        <SuccessStoryTableAction />
        <SuccessStoryListPage />
      </div>
    </PageContainer>
  );
}
