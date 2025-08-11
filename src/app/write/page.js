export default function Write(){
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