import clientPromise from "../../../../utils/db";

export default async function Home(){
    const client = await clientPromise;
    const db = client.db('community_forum'); // ✨ DB 이름을 입력하세요
    const posts = await db.collection('post').find({}).toArray();
    console.log(posts)

  return(
    <div>
      {posts.map((post,i)=>{
        return(
          <div key={post._id.toString()}>{post.title}</div>
        )
      })}
    </div>
  )
}