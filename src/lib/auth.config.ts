import API from '@/instance/api';
import axios from 'axios';
import { CredentialsSignin, NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

class InvalidLoginError extends CredentialsSignin {
  code: string;

  constructor(message: string) {
    super();
    this.code = message;
  }
}

const authConfig = {
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new InvalidLoginError('Missing email or password');
        }
        try {
          const response = await axios.post(
            process.env.NEXT_PUBLIC_API_ENDPOINT_URL + API.auth.login,
            {
              email: credentials?.email,
              password: credentials?.password
            }
          );
          // console.log(response.data, 'response.data');
          if (response.data.error) {
            throw new InvalidLoginError(response.data.error);
          }

          const user = response?.data?.data?.data;
          // console.log(user, 'usersss');
          if (user) {
            return {
              id: user._id,
              name: user.username,
              email: user.email,

              accessToken: response.data.data.accessToken
            };
          } else {
            return null;
          }
        } catch (e: any) {
          // console.log(e, 'error');
          throw new InvalidLoginError(e.response?.data?.message);
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log(user, 'useruseruseruser');
      if (user) {
        token.accessToken = user.accessToken;
        token.name = user.name;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      const typedToken = token as {
        id: string;
        name: string;
        email: string;
        accessToken: string;
      };

      session.user.id = typedToken.id;
      session.user.accessToken = typedToken.accessToken;
      session.user.name = typedToken.name;
      session.user.email = typedToken.email;

      return session;
    }
  },
  pages: {
    signIn: '/' //sigin page
  }
} satisfies NextAuthConfig;

export default authConfig;
