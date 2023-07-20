import { useState, useContext } from "react"
import { postNewCommentForAnArticle } from "../utils/api"
import { UserContext } from "../contexts/User"

export const CommentsListForm = ({article_id, setComments}) => {
    const [newComment, setNewComment] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    const maxLength = 250
    const { user } = useContext(UserContext)

    const handleOnChange = (e) => {
        setNewComment(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(newComment && user && article_id)
        postNewCommentForAnArticle(article_id, user.username, newComment ).then((postedComment) => {
            setComments((currComments) => {
                return [postedComment, ...currComments]
            })
            setNewComment("")
            setIsLoading(false)
        })
        .catch((err) => {
            setError(true)
        })
    }
    if (isLoading){
        <p>loading...</p>
    }
    return (
    <form className="w-full px-3 my-2" onSubmit={handleSubmit}>
        <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required value={newComment} onChange={handleOnChange} maxLength={maxLength}>
        </textarea>
        {isLoading ? <p>loading...</p> : 
        <div className="w-full flex justify-end">
            <div className="flex items-center justify-center px-4 text-gray-400 text-sm">{maxLength - newComment.length} left</div>
            <button disabled={!newComment.length || error} 
            data-disabled={!newComment.length || error}
            className="data-[disabled=true]:cursor-not-allowed text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            value='post-comment'>
                Comment
            </button>
        </div>}
        {error && <p className="text-red-600 text-left">Oops! something went wrong, please try again</p>}
</form>

    )   
}