import PageContainer from '@/components/layout/page-container';
import QuizViewPage from '@/features/quiz/quiz-view-page';

export const metadata = {
  title: 'Dashboard : Quiz View'
};

type PageProps = { params: Promise<{ quizId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <QuizViewPage quizId={params.quizId} />
      </div>
    </PageContainer>
  );
}
