import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string,
      sub: string,
      role: string,
      provider: string,
    } & DefaultSession['user'];
  }
}
