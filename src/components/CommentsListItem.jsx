import toast from 'react-hot-toast';
import { deleteUserComment, formatDate, getArticleById, getCommentsByArticleId, getUserByUserName } from "../utils";
import { Loader, UpdateVotes } from "."
import { UserContext } from "../contexts/User"
import { useContext, useEffect, useState} from "react";

export const CommentsListItem = ({ comment, article_id, setComments, setArticle}) => {
  const { user } = useContext(UserContext)
  const [author, setAuthor] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  
  const handleClickDelete = (e) => {  
    setIsLoading(true)
    let confirmExclusion = "Are you sure?";
    if (!confirm(confirmExclusion)) return 

    return deleteUserComment(comment.comment_id)
    .then((_) => {
      const promise = [getArticleById(article_id), getCommentsByArticleId(article_id)]
      Promise.all(promise).then((resolved) => {
        setArticle(resolved[0])
        setComments(resolved[1])
        toast.success('Comment deleted.');
        setIsLoading(false)
      })
      
    }).catch(error => {
      toast.error('Oops! something went wrong..');
    })
  }

  useEffect(() => {
    getUserByUserName(comment.author).then((result) => {
      setAuthor(result)
    })
  },[])
  if (isLoading) {
    <Loader />
  }
  return (
    <li className="border rounded-md p-3">
      <div className='flex gap-3 items-center'>
        {user && <img src={author.avatar_url} alt={`${author.username} avatar`}
          className="h-8 w-8 rounded-full
          border-2 border-primary  shadow-primary"/> }
          <div className="">
            <h3 className="font-bold">{comment.author}</h3>
            <time dateTime={comment.created_at} className="block text-xs text-gray-500">
              {formatDate(comment.created_at)}
            </time>
          </div>
      </div>
      <p className="text-gray-600 mt-2 w-[80%]">{comment.body}</p>
      {user && <UpdateVotes article_id={article_id} comment_id={comment.comment_id} votes={comment.votes} />}
      {user && user.username === comment.author && 
      <div className="w-full flex justify-end mt-3">
            <button disabled={isLoading} data-disabled={isLoading}
            onClick={handleClickDelete}
            className="data-[disabled=true]:cursor-not-allowed text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 text-center"
            value='btn-delete'>
                Delete
            </button>
        </div>}
    </li>
  )
}