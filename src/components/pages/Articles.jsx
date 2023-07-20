import { useEffect, useState } from "react"
import { getArticles } from "../../utils/api"
import { ArticlesCard, Select } from "../index"
import { useParams, useSearchParams } from 'react-router-dom';
import { Error } from "../Error";

export const Articles = () => {
    const [filterParams, setFilterParams] = useSearchParams();

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
    const sortByParam = filterParams.get('sortBy');
    const orderParam = filterParams.get('order');
    
    const [filters, setFilters] = useState({
        sortBy: sortByParam || "created_at",
        order: orderParam || "desc"
    })
    const { topic } = useParams()

    const filterChange = (value, name) => {
        setFilters({
            ...filters,
            [name]: value
        })
        const params = new URLSearchParams(filterParams);
        params.set(name, value);
        setFilterParams(params);
    }
    
    useEffect(() => {
        getArticles(topic === 'all' ? '' : topic, filters).then((articles) => {
            setArticles(articles)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
            setApiError(err)
        })
    }, [topic, filters])
    
    useEffect(() => {
        setFilters({
            sortBy: "created_at",
            order: "desc"
        })
        setApiError(null)
    }, [topic])

    if (apiError) {
        return <Error  
            errorStatus={apiError.response.status} 
            errorMessage={apiError.response.data.msg}
        />
    } else {
        return (<>
            <div className="mb-9 flex gap-8 justify-end">
                <Select options={sortByOptions} name="sortBy" value={filters.sortBy} onChange={filterChange} />
                <Select options={orderOptions} name="order" value={filters.order} onChange={filterChange}/>
            </div>
            { isLoading && (<p>Loading...</p>) }
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {articles.map((article) => {
                    return  <ArticlesCard key={article.article_id} article={article} />
                })}
            </ul>
        </>)
    }
}