import { ObjectId } from "mongodb";
import clientPromise from "../../../../utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {

//   const formData = await request.formData();
//   const title=formData.get('title');
//   const content=formData.get('content');
//   const id = formData.get('id');
const {id} = await request.json()


  const client = await clientPromise;
  const db = client.db('community_forum'); // ✨ DB 이름을 입력하세요
  const posts = await db.collection('post').deleteOne({_id :new ObjectId(id)});

  return NextResponse.redirect(new URL('/', request.url));
}