import React from 'react';
import { useEffect, useState, useContext } from "react"
import { deleteUserArticle, getArticleById } from "../../utils/api"
import { useParams, useNavigate } from 'react-router-dom';
import { formatDate } from "../../utils/formating";
import { Error } from "../Error";
import { UpdateVotes, CommentsList, Loader } from "../index";
import { UserContext } from "../../contexts/User";
import { toast } from "react-hot-toast";
import dompurify from 'dompurify';

export const Article = () => {
    const navigate = useNavigate();
    const { article_id } = useParams()
    const [article, setArticle] = useState({})
    const [apiError, setApiError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const {user} = useContext(UserContext)

    useEffect(() => {
        getArticleById(article_id).then((singleArticle) => {

            setArticle(singleArticle)
            setIsLoading(false)
        })
        .catch((err) => {
            setApiError(err)
        })
    },[article_id])

    const handleArticleDelete = () => {
    setIsLoading(true)
    let confirmExclusion = "Are you sure?";

    if (!confirm(confirmExclusion)) return 

    deleteUserArticle(article_id)
    .then((_) => {
        toast.success('article deleted.', {
            position:"top-right"
        });
        setIsLoading(false)
        navigate('/')

    }).catch(error => {
        toast.error('Oops! something went wrong..');
        setApiError(error)
    })
    }
    if(apiError){
        return <Error  
        errorStatus={apiError.response.status} 
        errorMessage={apiError.response.data.msg} />
    } else if (isLoading) {
        return <Loader />
    } else {
    return (<>
        <section className="mb-10">
            <div className="grid gap-4 lg:gap-8">
                <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                    <img alt={article.title} src={article.article_img_url}
                    className="h-full w-full object-cover"/>
                </div>
                <div className="flex justify-between">
                    <span className="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-sm text-red-600">{article.topic}</span>
                    { user &&  article.author === user.username && <div className="flex gap-3">
                        <button disabled={isLoading} data-disabled={isLoading}
                        onClick={handleArticleDelete}
                        className="data-[disabled=true]:cursor-not-allowed text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 text-center "
                        value='btn-delete'>
                        Delete
                        </button> 
                        {/* <button disabled={isLoading} data-disabled={isLoading}
                        onClick={`/articles/${article.article_id}`}
                        className="data-[disabled=true]:cursor-not-allowed text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 text-center"
                        value='btn-delete'>
                        Edit
                        </button> */}
                    </div> }
                </div>
                <h2 className="text-2xl font-bold sm:text-4xl">{article.title}</h2>
                <div className="lg:py-8">
                    <article className="text-gray-600">
                        {/* <p>{article.body}</p> */}
                        {React.createElement('div', {
                    dangerouslySetInnerHTML: { __html: dompurify.sanitize(article.body) }})}
                    
                        <time dateTime={article.created_at} className="text-gray-500 text-xs">
                            {formatDate(article.created_at)}
                        </time>
                        <footer className="flex justify-between gap-3 relative mt-10">
                            <div className="m-0 leading-0 flex gap-2 items-center text-base">
                                <span className="text-gray-500">posted by: </span>
                                <p className="text-gray-800">{article.author}</p>
                            </div>

                            <div className="flex gap-8 items-center">
                                {user && <UpdateVotes votes={article.votes} article_id={article_id} />}
                                <div className="flex gap-2 items-center">
                                    <svg className="w-6 h-6 text-slate-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 5h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-2v3l-4-3H8m4-13H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2v3l4-3h4a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                                    </svg>
                                    <span>{article.comment_count}</span>
                                </div>
                            </div>
                        </footer>
                    </article>
                </div>
            </div>
        </section>
        <CommentsList setArticle={setArticle} article_id={article_id}/>
    </>)}
}