'use client';
import FormCardSkeleton from '@/components/form-card-skeleton';
import { Quiz } from '@/constants/data';
import { useGetQuizById } from '@/hook-api/quiz/quiz.hook';
import { notFound } from 'next/navigation';
import QuizForm from './quiz-form';

type TProductViewPageProps = {
  quizId: string;
};

export default function QuizViewPage({ quizId }: TProductViewPageProps) {
  let quiz = null;
  let pageTitle = 'Create New Quiz';

  const { data: quizData, isLoading, error } = useGetQuizById(quizId);
  if (isLoading) {
    return <FormCardSkeleton />;
  }
  if (quizId !== 'new') {
    quiz = quizData?.quiz as Quiz;
    if (error) {
      notFound();
    }
    pageTitle = `Edit Quiz`;
  }

  return <QuizForm initialData={quiz} pageTitle={pageTitle} />;
}
