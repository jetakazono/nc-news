import { deleteUserComment, formatDate, getArticleById, getCommentsByArticleId, getUserByUserName } from "../utils";
import { UpdateVotes } from "."
import { UserContext } from "../contexts/User"
import { useContext, useEffect, useState} from "react";

export const CommentsListItem = ({ comment, article_id, setComments, setArticle}) => {
  const { user } = useContext(UserContext)
  const [author, setAuthor] = useState({})
  
  const handleClick = (e) => {  
    return deleteUserComment(comment.comment_id)
    .then((_) => {
      const promise = [getArticleById(article_id), getCommentsByArticleId(article_id)]
      Promise.all(promise).then((resolved) => {
        setArticle(resolved[0])
        setComments(resolved[1])
      })
      
    }).catch(error => console.error(error))
  }

  useEffect(() => {
    getUserByUserName(comment.author).then((result) => {
      setAuthor(result)
    })
  },[])
  
  return (
    <li className="border rounded-md p-3">
      <img src={author.avatar_url} alt={`${author.username} avatar`}
        className="object-cover w-8 h-8 rounded-full 
        border-2 border-red-600  shadow-red-800"/> 
      <h3 className="font-bold">{comment.author}</h3>
      <time dateTime={comment.created_at} className="block text-xs text-gray-500">
        {formatDate(comment.created_at)}
      </time>
      <p className="text-gray-600 mt-2 w-[80%]">{comment.body}</p>
      <UpdateVotes article_id={article_id} comment_id={comment.comment_id} votes={comment.votes} />
      {user.username === comment.author && 
      <div className="w-full flex justify-end mt-3">
            <button onClick={handleClick}
            className=" text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 "
            value='btn-delete'>
                Delete
            </button>
        </div>}
    </li>
  )
}