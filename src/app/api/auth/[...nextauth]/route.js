// app/api/auth/[...nextauth]/route.js
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import clientPromise from '../../../../../utils/db'
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        let db = (await clientPromise).db('community_forum');
        let user = await db.collection('user_cred').findOne({email : credentials.email});
        if (!user) {
          console.log('해당 이메일은 없음');
          return null;
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log('비번틀림');
          return null;
        }
        return user;
      }
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일
    updateAge: 24 * 60 * 60, // 24시간마다 업데이트
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
