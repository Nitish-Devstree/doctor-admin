import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { QuizResultTableAction } from '@/features/quiz-result/component/quiz-result-table-action';
import QuizResultListPage from '@/features/quiz-result/quiz-result-listing';
import { Separator } from '@radix-ui/react-dropdown-menu';
export const metadata = {
  title: 'Dashboard : Quiz Result View'
};

type PageProps = { params: Promise<{ quizId: string }> };
export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Quiz Result' description='View Quiz Result' />
        </div>
        <Separator />
        <QuizResultTableAction />
        <QuizResultListPage quizId={params?.quizId} />
      </div>
    </PageContainer>
  );
}
