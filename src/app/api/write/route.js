import { ObjectId } from "mongodb";
import clientPromise from "../../../../utils/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {

  const session = await getServerSession(authOptions);
  const formData = await request.formData();
  const title=formData.get('title');
  const content=formData.get('content');

  if(session){
      const client = await clientPromise;
      const db = client.db('community_forum'); // ✨ DB 이름을 입력하세요
//   const posts = await db.collection('post').updateOne({title:title,content:content});
  const posts = await db.collection('post').insertOne({title,content,author:session.user.id});

  // return NextResponse.json('처리완료함', { status: 200 })
  return NextResponse.redirect(new URL('/', request.url));

  }
  return NextResponse.json('로그인 안했어요');
  
}