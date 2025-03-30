import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { QuizTableAction } from '@/features/quiz/component/quiz-table-action';
import QuizListPage from '@/features/quiz/quiz-listing';
import { cn } from '@/lib/utils';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs';
interface PageProps {
  searchParams: SearchParams;
}
export default async function Page({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const search = Array.isArray(searchParams.q)
    ? searchParams.q[0]
    : searchParams.q || '';

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Quiz' description='Manage quiz' />
          <Link
            href='/dashboard/quiz/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Link>
        </div>
        <Separator />
        <QuizTableAction />
        <QuizListPage />
      </div>
    </PageContainer>
  );
}
