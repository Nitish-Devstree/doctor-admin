'use client';

import { DataTable as QuizTable } from '@/components/ui/table/data-table';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useGetAllQuiz } from '@/hook-api/quiz/quiz.hook';
import { useSearchParams } from 'next/navigation';
import { columns } from './component/column';

export default function QuizListPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const search = searchParams.get('q');
  const limit = searchParams.get('limit') ?? 10;

  const filters = {
    page: Number(page),
    limit: Number(limit),
    ...(search && { search: search })
  };

  const { data: quizData, isLoading } = useGetAllQuiz(filters);
  if (isLoading) {
    return <DataTableSkeleton columnCount={6} rowCount={10} />;
  }

  return (
    <QuizTable
      columns={columns}
      data={quizData?.quizzes || []}
      totalItems={quizData?.totalCount || 0}
    />
  );
}
