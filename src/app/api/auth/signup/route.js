
import { NextResponse } from "next/server";
import clientPromise from "../../../../../utils/db";
import bcrypt from 'bcryptjs'; // bcryptjs 사용


export  async function POST(request) {

  const formData = await request.formData();
  const name=formData.get('name');
  const email=formData.get('email');
  const password=formData.get('password');
    console.log(typeof formData, typeof name)
    const hashedPassword = await bcrypt.hash(password,10)

    // 패스워드 변환하고 디비에 insertOne으로 보내기
      const client = await clientPromise;
      const db = client.db('community_forum'); // ✨ DB 이름을 입력하세요
      const posts = await db.collection('user_cred').insertOne({name,email,password:hashedPassword});

  // return NextResponse.json('처리완료함', { status: 200 })
  return NextResponse.redirect(new URL('/', request.url));

  }
  
