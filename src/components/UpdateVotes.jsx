import { useState, useContext } from "react";
import toast from 'react-hot-toast';
// import { UserContext } from "../contexts/User"
import { patchVotes, storage } from "../utils"

export const UpdateVotes = ({ article_id, comment_id, votes }) => {
  const [userVote, setUserVote] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  
  // const { user } = useContext(UserContext)

  const handleClickVote = (action) => {
    let newAction = action

    setIsLoading(true)

    if (action === 'like') {
      if(isLiked){
        setUserVote((currVote) => currVote - 1)
        newAction = 'dislike'
        setIsLiked(false)
      } else {
        setIsLiked(true)
        setIsDisliked(false)
        setUserVote((currVote) => currVote + 1)
      }
    } else if(action === 'dislike') {
      if(isDisliked){
        setUserVote((currVote) => currVote + 1)
        newAction = 'like'
        setIsDisliked(false)
      } else {
        setIsDisliked(true)
        setIsLiked(false)
        setUserVote((currVote) => currVote - 1)
      }
    }
    
    // storage.addVote(newAction, user.username, article_id, comment_id)

    patchVotes(comment_id, article_id, newAction)
    .then((_)=> {
      setIsLoading(false)
    })
    .catch((err) => {
      toast.error('Oops! something went wrong..');
      setUserVote((currVote) => {
        if(newAction ==="like") return currVote - 1
        else if(newAction === "dislike")return currVote + 1
      })
      setIsLoading(false)
      setIsDisliked(false)
      setIsLiked(false)
    })
  }

    return (
      <>
        <div className="flex justify-end gap-2">
          <button aria-label="dislike" className="flex items-center" onClick={() => handleClickVote('dislike')} disabled={isLoading} data-active={isDisliked}>
            <svg data-active={isDisliked} className="data-[active=true]:fill-red-400 w-4 h-4 relative top-[1px] fill-slate-500 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:fill-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 20a2 2 0 0 1-2-2v-6H2a2 2 0 0 1-2-2V8l2.3-6.12A3.11 3.11 0 0 1 5 0h8a2 2 0 0 1 2 2v8l-3 7v3h-1zm6-10V0h3v10h-3z"/></svg>
          </button>
          
          <span className="flex items-center justify-center rounded-md bg-gray-100 min-w-[2rem] px-1">{votes + userVote}</span>

          <button aria-label="like" className="flex items-center" onClick={() => handleClickVote("like")} disabled={isLoading}>
            <svg data-active={isLiked} className="data-[active=true]:fill-green-400 w-4 h-4 relative -top-[1px] fill-slate-500 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:fill-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 0h1v3l3 7v8a2 2 0 0 1-2 2H5c-1.1 0-2.31-.84-2.7-1.88L0 12v-2a2 2 0 0 1 2-2h7V2a2 2 0 0 1 2-2zm6 10h3v10h-3V10z"/></svg>
          </button>
        </div>
      </>
    )
}