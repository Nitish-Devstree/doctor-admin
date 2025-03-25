import { Metadata } from 'next';
import SignInViewPage from '@/features/auth/components/sigin-view';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
};

export default async function Page() {
  const session = await auth();
  if (session?.user) {
    redirect('/dashboard/overview');
  }
  return <SignInViewPage />;
}
