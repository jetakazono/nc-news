import { useEffect, useState } from "react"
import { getArticles } from "../../utils/api"
import { ArticlesCard } from "../index"
import { useParams } from 'react-router-dom';
import { Error } from "../Error";

export const Articles = () => {
    const [articles, setArticles] = useState([])
    const [apiError, setApiError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { topic } = useParams()
    
    useEffect(() => {
        getArticles(topic).then((articles) => {
            setArticles(articles)
            setIsLoading(false)
        })
    }, [topic])
    
    useEffect(() => {
        getArticles(topic).then((articles) => {
            setArticles(articles)
        }).catch((err) => setApiError(err))
    }, [])

    if (apiError) {
        return <Error  
            errorStatus={apiError.response.status} 
            errorMessage={apiError.response.data.msg}
        />
    } else if (isLoading) {
        return <p>loading...</p>
    } else {
        return (<>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {articles.map((article) => {
                    return  <ArticlesCard key={article.article_id} article={article} />
                })}
            </ul>
        </>)
    }
}