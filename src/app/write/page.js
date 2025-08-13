import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { redirect } from "next/dist/server/api-utils";

export default async function Write(){
//     const session = await getServerSession(authOptions);

//   if(!session){
//     redirect('/');
//   }
    
    return(
        <div>
            <form action='/api/write' method="POST">
                <input name='title'></input>
                <input name='content'></input>
                <button type='submit'>전송</button>
            </form>
        </div>
    )
}