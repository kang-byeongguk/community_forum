'use client'

import { useRouter } from "next/navigation"

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
        </div>
        {children}
      </body>
    </html>
  )
}