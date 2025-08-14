
export default function Signup(){
    return(
        <div>
            <form action='/api/auth/signup' method="POST">
            <input name="name" type='text' placeholder="이름"></input>
            <input name="email" type='text' placeholder="이메일"></input>
            <input name="password" type='password' placeholder="비밀번호"></input>
            <button type='submit'>회원가입 전송</button>
        </form>
    
        </div>
        )
}
