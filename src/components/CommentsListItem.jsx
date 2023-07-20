import { formatDate } from "../utils";
import { UpdateVotes } from "."

export const CommentsListItem = ({ comment, article_id }) => {
  return (
    <li className="border rounded-md p-3">
      <h3 className="font-bold">{comment.author}</h3>
      <time dateTime={comment.created_at} className="block text-xs text-gray-500">
        {formatDate(comment.created_at)}
      </time>
      <p className="text-gray-600 mt-2 w-[80%]">{comment.body}</p>
      
      <UpdateVotes article_id={article_id} comment_id={comment.comment_id} votes={comment.votes} />
    </li>
  )
}