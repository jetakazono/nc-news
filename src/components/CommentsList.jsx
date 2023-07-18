import { useEffect, useState } from "react"
import { CommentsListItem } from "./CommentsListItem"
import { getCommentsByArticleId } from "../utils/api"

export const CommentsList = ({article_id}) => {

    const [comments, setComments] = useState([])
    getCommentsByArticleId(1).then((res) => {
        setComments(res)
    })

    return (
        <section>
            <h2>Comments</h2>
            <hr />
            <ul>
                {comments.map((comment) => {
                    return <CommentsListItem key={comment.comment_id}  comment={comment} />
                })}
            </ul>
            
        </section>
    )
}