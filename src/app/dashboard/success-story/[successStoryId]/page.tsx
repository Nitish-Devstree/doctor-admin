import PageContainer from '@/components/layout/page-container';
import SuccessStoryViewPage from '@/features/success-story/success-story-view-page';

export const metadata = {
  title: 'Dashboard : Success Story View'
};

type PageProps = { params: Promise<{ successStoryId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <SuccessStoryViewPage successStoryId={params.successStoryId} />
      </div>
    </PageContainer>
  );
}
