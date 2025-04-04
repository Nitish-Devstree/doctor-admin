'use client';
import FormCardSkeleton from '@/components/form-card-skeleton';
import { useGetHomePage } from '@/hook-api/home-page/home-page.hook';
import { notFound } from 'next/navigation';
import HomePageForm from './home-page-form';

export default function HomePageViewPage() {
  const { data: homeData, isLoading, error } = useGetHomePage();
  if (isLoading) {
    return <FormCardSkeleton />;
  }

  if (error) {
    notFound();
  }

  return <HomePageForm initialData={homeData} />;
}
