import { useEffect, useState } from "react"
import toast from 'react-hot-toast';
import { CommentsListItem, CommentsListForm, Loader } from "."
import { getCommentsByArticleId } from "../utils/api"
import { Error } from "./Error"

export const CommentsList = ({ setArticle, article_id}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [apiError, setApiError] = useState(null)
    const [comments, setComments] = useState([])

    useEffect(() => {
        setApiError(null)

        getCommentsByArticleId(article_id)
        .then((res) => {
            setComments(res)
            setIsLoading(false)
    }).catch((err) => {
        toast.error('Sorry, comments currently unavailable.');
        setApiError(err)
    })
    },[])

   if (apiError) {
        return <Error  
            errorStatus={apiError.response.status} 
            errorMessage={apiError.response.data.msg}/>
    } 
        return (<>
            <section className="flex flex-col">
            { isLoading && <Loader />}
            <h3 className="font-bold text-lg">Comments</h3>
                <ul className="w-full bg-white rounded-lg border grid gap-2 p-2 sm:gap-4 sm:p-4">
                <CommentsListForm article_id={article_id} setComments={setComments} setArticle={setArticle}/>
                    {comments.map((comment) => <CommentsListItem article_id={article_id} key={comment.comment_id} comment={comment} setComments={setComments} setArticle={setArticle} />)}
                </ul>
            </section>
            </>
        )}