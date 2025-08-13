// app/api/auth/[...nextauth]/route.js
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import clientPromise from '../../../../../utils/db'

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  
  // 세션 전략을 database로 설정 (어댑터 사용 시 필수)
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30일
    updateAge: 24 * 60 * 60, // 24시간마다 업데이트
  },
  
  callbacks: {
    // JWT 콜백 제거 (database 전략에서는 불필요)
    async session({ session, user }) {
      // database 전략에서는 user 객체가 전달됨
      if (user) {
        session.user.id = user.id
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }