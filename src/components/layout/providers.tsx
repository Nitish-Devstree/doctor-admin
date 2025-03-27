'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import TanstackProviders from './tanstack-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
export default function Providers({
  session,
  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <SessionProvider session={session}>
          <TanstackProviders>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </TanstackProviders>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
