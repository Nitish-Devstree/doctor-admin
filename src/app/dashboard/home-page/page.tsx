import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import HomePageViewPage from '@/features/home-page/home-page-view.page';

export const metadata = {
  title: 'Dashboard : Home Page View'
};

export default async function Page() {
  return (
    <PageContainer scrollable>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Home Page' description='Manage Home Page' />
        </div>
        <HomePageViewPage />
      </div>
    </PageContainer>
  );
}
