'use client';
import FormCardSkeleton from '@/components/form-card-skeleton';
import { Video } from '@/constants/data';
import { useGetVideoById } from '@/hook-api/video/video.hook';
import { notFound } from 'next/navigation';
import VideoForm from './video-form';

type TProductViewPageProps = {
  videoId: string;
};

export default function VideoViewPage({ videoId }: TProductViewPageProps) {
  let video = null;
  let pageTitle = 'Create New video';

  const { data: videoData, isLoading, error } = useGetVideoById(videoId);
  if (isLoading) {
    return <FormCardSkeleton />;
  }
  if (videoId !== 'new') {
    video = videoData?.video as Video;
    if (error) {
      notFound();
    }
    pageTitle = `Edit Video`;
  }

  return <VideoForm initialData={video} pageTitle={pageTitle} />;
}
