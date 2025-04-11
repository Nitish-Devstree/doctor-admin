'use client';

import { QuizResult } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<QuizResult>[] = [
  {
    accessorKey: 'userDetails.name',
    header: 'Student Name'
  },
  {
    accessorKey: 'userDetails.email',
    header: 'Email'
  },
  {
    accessorKey: 'correctAnswers',
    header: 'Correct  Answers'
  },
  {
    accessorKey: 'wrongAnswers',
    header: 'Question Count'
  },
  {
    accessorKey: 'skippedQuestions',
    header: 'Skipped Questions'
  },
  {
    accessorKey: 'score',
    header: 'Score'
  }
];
