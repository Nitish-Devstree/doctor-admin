'use client';

import { DataTable as QuizResultTable } from '@/components/ui/table/data-table';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useGetAllQuizResult } from '@/hook-api/quiz-result/quiz-result.hook';
import { useSearchParams } from 'next/navigation';
import { columns } from './component/column';

export default function QuizResultListPage({ quizId }: { quizId: string }) {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const search = searchParams.get('q');
  const limit = searchParams.get('limit') ?? 10;

  const filters = {
    page: Number(page),
    limit: Number(limit),
    quizId: quizId,
    ...(search && { search: search })
  };

  const { data: quizResultData, isLoading } = useGetAllQuizResult(filters);
  if (isLoading) {
    return <DataTableSkeleton columnCount={6} rowCount={10} />;
  }

  return (
    <QuizResultTable
      columns={columns}
      data={quizResultData?.results || []}
      totalItems={quizResultData?.totalCount || 0}
    />
  );
}
