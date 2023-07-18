import { formatDate } from "../utils/formating";

export const CommentsListItem = ({ comment }) => {
  
    return (
        <li className="border rounded-md p-3 ml-3 my-3">
            <h3 className="font-bold">{comment.author}</h3>
            <p>{formatDate(comment.created_at)}</p>
            <p className="text-gray-600 mt-2">{comment.body}</p>
            <div className="flex justify-end p-4">
        <button className="flex items-center ml-6">
          <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 0h1v3l3 7v8a2 2 0 0 1-2 2H5c-1.1 0-2.31-.84-2.7-1.88L0 12v-2a2 2 0 0 1 2-2h7V2a2 2 0 0 1 2-2zm6 10h3v10h-3V10z"/></svg>
        </button>
        <span className="ml-2">{comment.votes}</span>
        <button className="flex items-center ml-4">
          <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 20a2 2 0 0 1-2-2v-6H2a2 2 0 0 1-2-2V8l2.3-6.12A3.11 3.11 0 0 1 5 0h8a2 2 0 0 1 2 2v8l-3 7v3h-1zm6-10V0h3v10h-3z"/></svg>
        </button>
            </div>
        </li>
    )
}