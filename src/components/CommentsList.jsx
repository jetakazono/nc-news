import { useEffect, useState } from "react"
import { CommentsListItem } from "./CommentsListItem"
import { getCommentsByArticleId } from "../utils/api"
import { Error } from "./Error"

export const CommentsList = ({article_id}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [apiError, setApiError] = useState(null)

    const [comments, setComments] = useState([])
    useEffect(() => {
        setApiError(null)
        getCommentsByArticleId(article_id)
        .then((res) => {
        setComments(res)
        setIsLoading(false)
    }).catch((err) => setApiError(err))
    },[])

   if (apiError) {
        return <Error  
            errorStatus={apiError.response.status} 
            errorMessage={apiError.response.data.msg}
        />
    } else if (isLoading) {
        return <p>Loading...</p>
    } else {
        return (<>
            <section className="flex flex-col">
                <h3 className="font-bold">Comments</h3>
                <ul className="w-full bg-white rounded-lg border p-2 my-4 mx-6">
                    {comments.map((comment) => {
                        return <CommentsListItem key={comment.comment_id}  comment={comment} />
                    })}
                </ul>
            </section>
            </>
        )
    }
}