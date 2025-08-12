import { ObjectId } from "mongodb";
import clientPromise from "../../../../utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {

  const formData = await request.formData();
  const title=formData.get('title');
  const content=formData.get('content');
  const id = formData.get('id');

  const client = await clientPromise;
  const db = client.db('community_forum'); // ✨ DB 이름을 입력하세요
//   const posts = await db.collection('post').updateOne({title:title,content:content});
  const posts = await db.collection('post').updateOne({_id: new ObjectId(id)},{$set:{title:title,content:content}});

  // return NextResponse.json('처리완료함', { status: 200 })
  return NextResponse.redirect(new URL('/', request.url));
}