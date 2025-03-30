'use client';

import { Switch } from '@/components/ui/switch';
import { Quiz } from '@/constants/data';
import { useToggleQuizStatus } from '@/hook-api/quiz/quiz.hook';

interface ResultOutActionProps {
  data: Quiz;
}

export const ResultOutAction: React.FC<ResultOutActionProps> = ({ data }) => {
  const { mutate: toggleStatus, isPending: isToggling } = useToggleQuizStatus(data._id);

  return (
    <Switch
      checked={data.isResultOut}
      disabled={isToggling}
      onCheckedChange={() => toggleStatus({isResultOut: data.isResultOut?0:1})}
    />
  );
};