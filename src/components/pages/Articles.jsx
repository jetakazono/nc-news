import { useEffect, useState } from "react"
import { getArticles } from "../../utils/api"
import { ArticlesCard, Select } from "../index"
import { useParams } from 'react-router-dom';
import { Error } from "../Error";

export const Articles = () => {
    const [articles, setArticles] = useState([])
    const [apiError, setApiError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const sortByOptions = [{
        value: "created_at",
        label: "Date"
    },
    {
        value: "comment_count",
        label: 'Comment'
    },
    {
        value: "votes",
        label: 'Votes'
    }]
    const orderOptions = [{
        value: "desc",
        label: "Desc"
    },
    {
        value: "asc",
        label: 'Asc'
    }]
    const [filters, setFilters] = useState({
        sortBy: "created_at",
        order: "desc"
    })
    const { topic } = useParams()

    const filterChange = (value, name) => {
        setFilters(    {
            ...filters,
            [name]: value
        })
    }
    
    useEffect(() => {
        getArticles(topic, filters).then((articles) => {
            setArticles(articles)
            setIsLoading(false)
        }).catch((err) => {
            setApiError(err)
            setFilters({
                sortBy: "created_at",
                order: "desc"
            })
        })
    }, [topic, filters])

    useEffect(() => {
        setApiError(null)
    }, [topic])

    if (apiError) {
        return <Error  
            errorStatus={apiError.response.status} 
            errorMessage={apiError.response.data.msg}
        />
    } else if (isLoading) {
        return <p>Loading...</p>
    } else {
        return (<>
            <div className="mb-9 flex gap-8 justify-end">
                <Select options={sortByOptions} name="sortBy" onChange={filterChange} />
                <Select options={orderOptions} name="order" onChange={filterChange}/>
            </div>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {articles.map((article) => {
                    return  <ArticlesCard key={article.article_id} article={article} />
                })}
            </ul>
        </>)
    }
}