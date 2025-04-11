import API from '@/instance/api';
import instance from '@/instance/intance';
interface NotificationData {
  title: string;
  body: string;
}
export const postSendAllNotification = async (body: NotificationData) => {
  const response = await instance.post(API.notification.sendAll, body);
  return response.data;
};
