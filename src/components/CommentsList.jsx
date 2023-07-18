import { useEffect, useState } from "react"
import { CommentsListItem } from "./CommentsListItem"
import { getCommentsByArticleId } from "../utils/api"

export const CommentsList = ({article_id}) => {

    const [comments, setComments] = useState([])
    useEffect(() => {
        getCommentsByArticleId(article_id).then((res) => {
        setComments(res)})
    },[])
    

    return (<>
        <section className="flex flex-col">
            <h3 class="font-bold">Comments</h3>
            <ul className="w-full bg-white rounded-lg border p-2 my-4 mx-6">
                {comments.map((comment) => {
                    return <CommentsListItem key={comment.comment_id}  comment={comment} />
                })}
            </ul>
        </section>
        </>
    )
}