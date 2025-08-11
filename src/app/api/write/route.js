import { NextResponse } from 'next/server'; // NextResponse를 임포트
import clientPromise from '../../../../utils/db';

export async function GET(request) {
  return NextResponse.json('처리완료함', { status: 200 });
}

export async function POST(request) {

  const formData = await request.formData();
  const title=formData.get('title');
  const content=formData.get('content');

  const client = await clientPromise;
  const db = client.db('community_forum'); // ✨ DB 이름을 입력하세요
  const posts = await db.collection('post').insertOne({title:title,content:content});

  // return NextResponse.json('처리완료함', { status: 200 })
  return NextResponse.redirect(new URL('/', request.url));
}