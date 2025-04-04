'use client';
import FormCardSkeleton from '@/components/form-card-skeleton';
import { Scholarship, Video } from '@/constants/data';
import { useGetScholarshipById } from '@/hook-api/scholarship/scholarship.hook';
import { notFound } from 'next/navigation';
import VideoForm from './scholarship-form';
import ScholarshipForm from './scholarship-form';

type TProductViewPageProps = {
  scholarshipId: string;
};

export default function ScholarshipViewPage({
  scholarshipId
}: TProductViewPageProps) {
  let scholarship = null;
  let pageTitle = 'Create New scholarship';

  const {
    data: scholarshipData,
    isLoading,
    error
  } = useGetScholarshipById(scholarshipId);
  if (isLoading) {
    return <FormCardSkeleton />;
  }
  if (scholarshipId !== 'new') {
    scholarship = scholarshipData as Scholarship;
    if (error) {
      notFound();
    }
    pageTitle = `Edit scholarship`;
  }

  return <ScholarshipForm initialData={scholarship} pageTitle={pageTitle} />;
}
