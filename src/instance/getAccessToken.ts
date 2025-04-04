import { getSession } from 'next-auth/react';
export const getAccessToken = async () => {
  const session = await getSession();
  if (session) return session.user && session.user.accessToken;

  return '';
};
