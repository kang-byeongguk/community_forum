import { ObjectId } from "mongodb";
import clientPromise from "../../../../utils/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {

//   const formData = await request.formData();
//   const title=formData.get('title');
//   const content=formData.get('content');
//   const id = formData.get('id');
  const session = await getServerSession(authOptions);
  
try{
  if (!session) {
            return NextResponse.json('로그인하지 않았습니다.', { status: 401 });
        }
const {id} = await request.json()
  const client = await clientPromise;
  const db = client.db('community_forum'); // ✨ DB 이름을 입력하세요
  const post = await db.collection('post').findOne({_id:new ObjectId(id)})
   if(session.user.id===post.author){
  const posts = await db.collection('post').deleteOne({_id :new ObjectId(id)});
  return NextResponse.redirect(new URL('/', request.url));

  }
}catch(error){
    return NextResponse.json('에러발생', { status: 500 })
}
  


  return NextResponse.redirect(new URL('/', request.url));
}