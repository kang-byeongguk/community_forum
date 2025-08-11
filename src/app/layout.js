'use client'

import { useRouter } from "next/navigation"

export default function Layout({children}){
  const router = useRouter()
return(
  <div><button onClick={()=>{router.push('/')}}>홈</button>
  <button onClick={()=>{router.forward()}}>앞으로</button>
  <button onClick={()=>{router.back()}}>뒤로</button>{children}</div>
  
)
}