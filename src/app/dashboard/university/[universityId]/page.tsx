import PageContainer from '@/components/layout/page-container';
import UniversityViewPage from '@/features/university/univsersity-view-page';

export const metadata = {
  title: 'Dashboard : University View'
};

type PageProps = { params: Promise<{ universityId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <UniversityViewPage params={params} />
      </div>
    </PageContainer>
  );
}
