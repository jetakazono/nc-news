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
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {articles.map((article) => {
                return  <Article key={article.article_id} article={article} />
            })}
        </ul>
    </>)
}