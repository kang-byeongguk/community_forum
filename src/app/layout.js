'use client'

import { useRouter } from "next/navigation"
import LoginButton from "../../components/LoginButton"
import { SessionProvider } from "next-auth/react"

export default function RootLayout({children}){
  const router = useRouter()
  
  return(
    <html lang="ko">
      <body>
        <div>
          <button onClick={()=>{router.push('/')}}>홈</button>
          <button onClick={()=>{router.forward()}}>앞으로</button>
          <button onClick={()=>{router.back()}}>뒤로</button>
          <button onClick={()=>{router.push('/write')}}>글작성</button>
          <button onClick={()=>{router.push('/signup')}}>회원가입</button>
          
        </div>
        <SessionProvider>
          <LoginButton></LoginButton>
          {children}</SessionProvider>
      </body>
    </html>
  )
}