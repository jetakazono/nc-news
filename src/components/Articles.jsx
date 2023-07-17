import { useEffect, useState } from "react"
import { getArticles } from "../utils/api"
import { Article } from "./index"

export const Articles = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        getArticles().then((articles) => {
            setArticles(articles)
        })
    }, [])
    return (<>
        <ul className="flex flex-wrap">
            {articles.map((article) => {
                return  <Article key={article.article_id} article={article} />
            })}
           
        </ul>
        </>)
}