import { ObjectId } from "mongodb";
import clientPromise from "../../../../utils/db";
import Link from "next/link";
import Delete from "../../../../components/Delete";

export default async function Home(props){
    const client = await clientPromise;
    const params = await props.params
    const db = client.db('community_forum'); // ✨ DB 이름을 입력하세요
    const posts = await db.collection('post').findOne({_id:new ObjectId(params.id)})

  return(
    <div>
      <Link href={`/write/${params.id}`}>수정하기</Link>
      <Delete id={params.id}></Delete>
        <div>{posts.title}</div>
        <div>{posts.content}</div>
    </div>
  )
}