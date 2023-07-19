import { useState } from "react";
import { patchVoteByCommentId } from "../utils/api";

export const CommentsListItemVotes = ({ comment_id, votes }) => {
  const [commentVote, setCommentVote] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)

  const handleClickVote = (action) => {
    setIsError(false)
    setIsLoading(true)

    let newAction = action

    if (action === 'like') {
      if(isLiked){
        setCommentVote((currVote) => currVote - 1)
        newAction = 'disliked'
        setIsLiked(false)
      } else {
        setIsLiked(true)
        setIsDisliked(false)
        setCommentVote((currVote) => currVote + 1)
      }

    } else if(action === 'dislike') {
      if(isDisliked){
        setCommentVote((currVote) => currVote + 1)
        newAction = 'liked'
        setIsDisliked(false)
      } else {
        setIsDisliked(true)
        setIsLiked(false)
        setCommentVote((currVote) => currVote - 1)
      }
    }

    patchVoteByCommentId(comment_id, action)
    .then((_)=> {
      setIsLoading(false)
    })
    .catch((err) => {
      setCommentVote((currVote) => {
        return currVote - 1
      })
      setIsError(true)
    })
  }
    return (
      <>
        <div className="flex justify-end p-4 gap-2">
          <button className="flex items-center" onClick={() => handleClickVote('dislike')} disabled={isLoading} data-active={isDisliked}>
            <svg data-active={isDisliked} className="data-[active=true]:fill-red-400 w-4 h-4 relative top-[1px] fill-slate-500 transition ease-in-out group-hover:-translate-y-1 group-hover:scale-110 group-hover:fill-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 20a2 2 0 0 1-2-2v-6H2a2 2 0 0 1-2-2V8l2.3-6.12A3.11 3.11 0 0 1 5 0h8a2 2 0 0 1 2 2v8l-3 7v3h-1zm6-10V0h3v10h-3z"/></svg>
          </button>
          
          <span className="flex items-center justify-center rounded-md bg-gray-100 min-w-[2rem] px-1">{votes + commentVote}</span>

          <button className="flex items-center" onClick={() => handleClickVote('like')} disabled={isLoading}>
            <svg data-active={isLiked} className="data-[active=true]:fill-green-400 w-4 h-4 relative -top-[1px] fill-slate-500 transition ease-in-out group-hover:-translate-y-1 group-hover:scale-110 group-hover:fill-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 0h1v3l3 7v8a2 2 0 0 1-2 2H5c-1.1 0-2.31-.84-2.7-1.88L0 12v-2a2 2 0 0 1 2-2h7V2a2 2 0 0 1 2-2zm6 10h3v10h-3V10z"/></svg>
          </button>
        </div>
        
        {isError && <p className="text-red-700 text-right text-sm">something went wrong 🙃 please try again.</p>}
      </>
    )
}