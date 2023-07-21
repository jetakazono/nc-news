import { useState, useContext } from "react"
import toast from 'react-hot-toast';
import { getArticleById, postNewCommentForAnArticle } from "../utils/api"
import { UserContext } from "../contexts/User"
import { Loader } from ".";

export const CommentsListForm = ({article_id, setComments, setArticle}) => {
    const [newComment, setNewComment] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const maxLength = 400
    const { user } = useContext(UserContext)

    const handleOnChange = (e) => {
        setNewComment(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(newComment && user && article_id) {
            setIsLoading(true)

            postNewCommentForAnArticle(article_id, user.username, newComment ).then((postedComment) => {
                setComments((currComments) => {
                    toast.success('Success! thanks for you comment.');
                    return [postedComment, ...currComments]
                })
                getArticleById(article_id).then((art) => setArticle(art))
                setNewComment("")
                setIsLoading(false)
            })
            .catch(() => {
                toast.error('Oops! something went wrong..');
                setIsLoading(false)
            })            
        }
    }

    return (<>
        <form className="w-full my-2 relative" onSubmit={handleSubmit}>
            { isLoading && <Loader />}
            <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required value={newComment} onChange={handleOnChange} maxLength={maxLength}>
            </textarea>
            {!user && <p className="text-black">login to post a comment</p>}
            {user && <div className="w-full flex justify-end">
                <div className="flex items-center justify-center px-4 text-gray-400 text-sm">{maxLength - newComment.length} left</div>
                
                <button disabled={!newComment.length || isLoading} data-disabled={!newComment.length || isLoading}
                    className="data-[disabled=true]:cursor-not-allowed text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                value='post-comment'>
                    Comment
                </button>
            </div>}
        </form>
    </>)   
}