import { ObjectId } from "mongodb";
import clientPromise from "../../../../utils/db";

export default async function Patch(props){
    const client = await clientPromise;
    const params = await props.params
    const db = client.db('community_forum'); // ✨ DB 이름을 입력하세요
    const post = await db.collection('post').findOne({_id:new ObjectId(params.id)})
console.log(post);
  return(
    <div>
            <form action='/api/patch' method="POST">
                <input name='title' defaultValue={post.title}></input>
                <input name='content' defaultValue={post.content}></input>
                <input hidden name='id' defaultValue={post._id.toString()}></input>
                <button type='submit'>전송</button>
            </form>
        </div>
  )
}
