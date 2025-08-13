import Link from "next/link";
import clientPromise from "../../utils/db";

export const dynamic = 'force-dynamic'


export default async function Home(){
    const client = await clientPromise;
    const db = client.db('community_forum'); // ✨ DB 이름을 입력하세요
    const posts = await db.collection('post').find({}).toArray();
    console.log(posts)

  return(
    <div>
      {posts.map((post) => (
  <Link key={post._id.toString()} href={`/content/${post._id}`}>
    <div>{post.title}</div>
  </Link>
))}
    </div>
  )
}