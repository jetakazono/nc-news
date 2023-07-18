import { useEffect, useState } from "react"
import { getArticleById } from "../../utils/api"
import { useParams } from 'react-router-dom';
import { formatDate } from "../../utils/formating";
import { Error } from "../Error";
import { CommentsList } from "../CommentsList";

export const Article = () => {
    const { article_id } = useParams()
    const [article, setArticle] = useState({})
    const [apiError, setApiError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getArticleById(article_id).then((singleArticle) => {
            setArticle(singleArticle)
            setIsLoading(false)
        })
        .catch((err) => {
            setApiError(err)
        })
    },[article_id])

    if(apiError){
        return <Error  
        errorStatus={apiError.response.status} 
        errorMessage={apiError.response.data.msg} />
    } else if (isLoading) {
        return <p>Loading..</p>
   } else {
    return (<>
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <h2 className="text-2xl font-bold sm:text-4xl">{article.title}</h2>
                <div className="mt-8 grid gap-4 lg:gap-8">
                    <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                        <img alt={article.title} src={article.article_img_url}
                        className="h-full w-full object-cover"/>
                    </div>
                    <time dateTime={article.created_at} className="text-s text-gray-500">
                        {formatDate(article.created_at)}
                    </time>
                    <div className="lg:py-8">
                        <article className="space-y-4 text-gray-600">
                            <p>{article.body}</p>
                            <p className="text-sm">
                                <span className="text-gray-500">posted by:</span> {article.author}
                            </p>
                            <span className="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-sm text-red-300">{article.topic}</span>
                            <footer className="flex justify-end gap-3 relative">
                    <svg className="w-6 h-6 text-pink-800 dark:text-pink" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"/>
  </svg>
                            <span>{article.votes}</span>
                        <svg className="w-6 h-6 text-black-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 5h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-2v3l-4-3H8m4-13H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2v3l4-3h4a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
  </svg>
                            <span>{article.comment_count}</span>
                    </footer>
                        </article>
                    </div>
                </div>
            </div>
        </section>
        <CommentsList article_id={article_id}/>
        {/* <div class="w-full bg-white rounded-lg border p-2 my-4 mx-6">

        <h3 class="font-bold">Discussion</h3>

        <form>

            <div class="flex flex-col">

                <div class="border rounded-md p-3 ml-3 my-3">
                    <div class="flex gap-3 items-center">

                        <img src="https://avatars.githubusercontent.com/u/22263436?v=4"
                            class="object-cover w-8 h-8 rounded-full 
                            border-2 border-emerald-400  shadow-emerald-400
                            ">

                        <h3 class="font-bold">
                            User name
                        </h3>
                    </div>


                    <p class="text-gray-600 mt-2">
                        this is sample commnent
                    </p>

                </div>

                <div class="border rounded-md p-3 ml-3 my-3">
                    <div class="flex gap-3 items-center">

                        <img src="https://avatars.githubusercontent.com/u/22263436?v=4"
                            class="object-cover w-8 h-8 rounded-full 
                            border-2 border-emerald-400  shadow-emerald-400
                            ">

                        <h3 class="font-bold">
                            User name
                        </h3>
                    </div>


                    <p class="text-gray-600 mt-2">
                        this is sample commnent
                    </p>

                </div>





            </div>



            <div class="w-full px-3 my-2">
                <textarea
                    class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                    name="body" placeholder='Type Your Comment' required></textarea>
            </div>

            <div class="w-full flex justify-end px-3">
                <input type='submit' class="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500" value='Post Comment'>
            </div>
        </form>


    </div> */}
    </>)
   }
    
}