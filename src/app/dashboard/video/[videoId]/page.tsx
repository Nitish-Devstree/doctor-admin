import PageContainer from '@/components/layout/page-container';
import VideoViewPage from '@/features/video/video-view-page';

export const metadata = {
  title: 'Dashboard : Video View'
};

type PageProps = { params: Promise<{ videoId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <VideoViewPage videoId={params.videoId} />
      </div>
    </PageContainer>
  );
}
