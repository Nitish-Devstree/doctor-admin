'use client';
import FormCardSkeleton from '@/components/form-card-skeleton';
import { User } from '@/constants/data';
import { useGetUserById } from '@/hook-api/user/user.hook';
import { notFound } from 'next/navigation';
import UserForm from './user-form';

type TProductViewPageProps = {
  userId: string;
};

export default function ProductViewPage({ userId }: TProductViewPageProps) {
  let user = null;
  let pageTitle = 'Create New User';

  const { data: userData, isLoading, error } = useGetUserById(userId);
  if (isLoading) {
    return <FormCardSkeleton />;
  }
  if (userId !== 'new') {
    user = userData?.data as User;
    if (error) {
      notFound();
    }
    pageTitle = `Edit User`;
  }

  const formattedUser = user
    ? {
        ...user,
        phoneNumber: user.phoneNumber.toString()
      }
    : null;

  return <UserForm initialData={formattedUser} pageTitle={pageTitle} />;
}
