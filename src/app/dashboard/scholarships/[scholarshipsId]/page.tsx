import PageContainer from '@/components/layout/page-container';
import ScholarshipViewPage from '@/features/scholarship/scholarship-view-page';

export const metadata = {
  title: 'Dashboard : Scholarship View'
};

type PageProps = { params: Promise<{ scholarshipsId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <ScholarshipViewPage scholarshipId={params.scholarshipsId} />
      </div>
    </PageContainer>
  );
}
