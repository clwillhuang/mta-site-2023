import GoogleProvider from "next-auth/providers/google";
import NextAuth, { Profile } from "next-auth"
import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "@/models/User";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // profile(profile) {
      //   return {
      //     id: profile.sub,
      //     name: profile.name,
      //     email: profile.email,
      //     picture: profile.picture,
      //     displayName: profile.displayName,
      //     sub: profile.sub,
      //     provider: 'google',
      //   }
      // },
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }: { user: any; account: any; profile?: Profile | undefined; credentials?: any; }) {
      if (!profile) {
        return false;
      }
      await dbConnect();
      const userData = {
        googleId: user.id,
        googleSub: profile.sub,
        username: profile.name,
        provider: account.provider,
        email: profile.email,
        picture: profile.picture ?? '',
      };
      const existingUser = await User.findOne({ googleId: userData.googleId, provider: userData.provider });
      if (existingUser) {
        await User.findOneAndUpdate({ googleId: userData.googleId, provider: userData.provider }, userData);
      } else {
        let user = new User(userData);
        await user.save();
      }
      return true;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken
      session.user.id = token.sub;
      session.user.provider = token.provider;
      session.user.sub = token.sub;
      
      return session
    },
    async jwt({ token, account, profile }) {
      // console.log('JWT CALLBACK', token, account, profile)
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account && profile) {
        token.accessToken = account.access_token;
        token.sub = profile.sub;
        token.provider = account.provider;
        const user: IUser | null = await User.findOne({googleId: profile.sub, provider: account.provider});
        if (user) {
          token.role = user.role;
          token.id = user.id;
        }
      }
      return token
    }
  },
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions)

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, authOptions)
}

export { handler as GET, handler as POST }