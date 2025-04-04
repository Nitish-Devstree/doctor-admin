import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    accessToken?: string;
    email: string;
    name: string;
    image?: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      accessToken?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    email: string;
    accessToken?: string;
  }
}
