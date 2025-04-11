import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { postSendAllNotification } from './notifications.api';

interface NotificationData {
  title: string;
  body: string;
}

export const useSendNotification = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (data: NotificationData) => postSendAllNotification(data),
    onSuccess: () => {
      toast.success('Notification sent successfully');
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to send notification'
      );
    }
  });
};
