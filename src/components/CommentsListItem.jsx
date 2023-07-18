import { formatDate } from "../utils/formating";

export const CommentsListItem = ({ comment }) => {
  
    return (
        <li className="border rounded-md p-3 ml-3 my-3">
         {/* <img src=""
        class="object-cover w-8 h-8 rounded-full 
        border-2 border-red-600  shadow-red-800
        "/> */} 
            <h3 class="font-bold">{comment.author}</h3>
            <p>{formatDate(comment.created_at)}</p>
            <p class="text-gray-600 mt-2">{comment.body}</p>
            <div className="flex justify-end p-4">
            <svg className="w-6 h-6 text-red-300 hover:text-red-500 cursor-pointer mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"/>
                        </svg>
            <span>{comment.votes}</span>
            </div>
        </li>
    )
}