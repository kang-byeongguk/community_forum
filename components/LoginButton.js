// components/LoginButton.js
'use client' // App Router 사용시
import { useSession, signIn, signOut } from 'next-auth/react'

export default function LoginButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>로딩중...</p>
  console.log('로그인버튼')
  console.log(session)
  if (session) {
    return (
      <div>
        <p>안녕하세요, {session.user.name}님!</p>
        <img src={session.user.image} alt="Profile" width={50} height={50} />
        <button onClick={() => signOut()}>로그아웃</button>
      </div>
    )
  }

  return (
    <div>
      <p>로그인하지 않았습니다</p>
      <button onClick={() => signIn()}>로그인</button>
    </div>
  )
}