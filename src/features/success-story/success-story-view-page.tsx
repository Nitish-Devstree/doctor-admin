'use client';
import FormCardSkeleton from '@/components/form-card-skeleton';
import { SuccessStory } from '@/constants/data';
import { useGetSuccessStoryById } from '@/hook-api/success-story/success-story.hook';
import { notFound } from 'next/navigation';
import SuccessStoryForm from './success-story-form';

type TProductViewPageProps = {
  successStoryId: string;
};

export default function SuccessStoryViewPage({ successStoryId }: TProductViewPageProps) {
  let successStory = null;
  let pageTitle = 'Create New success story';

  const { data: successStoryData, isLoading, error } = useGetSuccessStoryById(successStoryId);
  if (isLoading) {
    return <FormCardSkeleton />;
  }
  if (successStoryId !== 'new') {
    successStory = successStoryData as SuccessStory;
    if (error) {
      notFound();
    }
    pageTitle = `Edit Success Story`;
  }

  return <SuccessStoryForm initialData={successStory} pageTitle={pageTitle} />;
}
