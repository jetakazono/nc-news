import { useState } from "react"

export const CommentsList = () => {
    const [comments, setComments] = useState([])
    
    return (
        <section>
            <h2>Comments</h2>
            <hr />
            
            <ul>
                {comments.map((comment) => {
                    return 
                })}
            </ul>
        </section>
    )
}