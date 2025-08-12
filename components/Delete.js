'use client'
export default function Delete({id}){
    const handleDelete = async () => {
        try {
            const response = await fetch('/api/delete', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            });
            
            if (response.ok) {
                window.location.href = '/'; // 클라이언트에서 이동
             
            }
        } catch (error) {
            console.error('삭제 실패:', error);
        }
    };

    return <button onClick={handleDelete}>삭제버튼</button>
}