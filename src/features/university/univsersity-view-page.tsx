'use client';
import FormCardSkeleton from '@/components/form-card-skeleton';
import { University } from '@/constants/data';
import { useGetUniversityById } from '@/hook-api/university/university.hook';
import { notFound } from 'next/navigation';
import UniversityForm from './university-form';

type TUserniversityViewPageProps = {
  universityId: string;
};

export default function UserniversityViewPage({
  universityId
}: TUserniversityViewPageProps) {
  let university = null;
  let pageTitle = 'Create New University';

  const {
    data: universityData,
    isLoading,
    error
  } = useGetUniversityById(universityId);

  console.log(universityData, 'universityData');
  if (isLoading) {
    return <FormCardSkeleton />;
  }
  if (universityId !== 'new') {
    university = universityData?.university as University;
    if (error) {
      notFound();
    }
    pageTitle = `Edit University`;
  }

  return <UniversityForm initialData={university} pageTitle={pageTitle} />;
}
