'use client';

import FormCardSkeleton from '@/components/form-card-skeleton';
import { useGetUniversityById } from '@/hook-api/university/university.hook';
import { notFound } from 'next/navigation';
import UniversityForm from './university-form';
import { University } from '@/types/university';

interface UniversityViewPageProps {
  params: {
    universityId: string;
  };
}

export default function UniversityViewPage({
  params: { universityId }
}: UniversityViewPageProps) {
  let pageTitle = 'Create University';
  let university: University | null = null;

  const {
    data: universityData,
    isLoading,
    error
  } = useGetUniversityById(universityId);

  // console.log(universityData, 'universityData');
  if (isLoading) {
    return <FormCardSkeleton />;
  }
  if (universityId !== 'new') {
    university = universityData?.university;
    if (error) {
      notFound();
    }
    // Transform the data to match the expected format

    pageTitle = `Edit University`;
  }

  return <UniversityForm initialData={university} pageTitle={pageTitle} />;
}
