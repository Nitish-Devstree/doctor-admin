import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import NotificationsPageViewPage from '@/features/notifications/notification-page-view.page';

export const metadata = {
  title: 'Dashboard : Notification View'
};

export default async function Page() {
  return (
    <PageContainer scrollable>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Notification' description='Manage Notification' />
        </div>
        {/* <HomePageViewPage /> */}
        <NotificationsPageViewPage />
      </div>
    </PageContainer>
  );
}
