import { useContext, useEffect, useState } from "react"
import { useParams, useSearchParams } from 'react-router-dom';
import { getArticles } from "../../utils/api"
import { ArticlesCard, Loader, Select, Error } from '../'
import { setUser } from "../../utils/storage";
import { UserContext } from "../../contexts/User";
import { toast } from "react-hot-toast";

export const Articles = () => {
    const {user} = useContext(UserContext)
    const [filterParams, setFilterParams] = useSearchParams();
    const [articles, setArticles] = useState([])
    const [apiError, setApiError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
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

    const filterChange = (key, value) => {
        const val = value?.value || value
        setFilters({
            ...filters,
            [key]: val
        })
        const params = new URLSearchParams(filterParams);
        params.set(key, val);
        setFilterParams(params);
    }
    const { sortBy, order } = filters;
    const applyFilters = () => {
        const params = new URLSearchParams(filterParams);
        const { sortBy, order } = filters;
        if(sortBy === 'created_at' && order === 'desc') return
        
        for (const key in filters) {
            params.set(key, filters[key]);
        }
        setFilterParams(params);
    }
    
    const loadData = () => {
        setIsLoading(true)
        getArticles(topic === 'all' ? '' : topic, sortBy, order).then((articles) => {
            setArticles(articles)
            setIsLoading(false)
        }).catch((err) => {
            setApiError(err)
        })
    }
    
    useEffect(() => {
        loadData()
        applyFilters()
        setApiError(null)
    }, [topic])

    useEffect(() => loadData(), [filters])
    
    useEffect(() => {
        setUser(user)
    }, [])

    if (apiError) {
        return <Error  
            errorStatus={apiError.response.status} 
            errorMessage={apiError.response.data.msg}
        />
    } {isLoading && <Loader />
        return (<>
            <div className="mb-9 flex gap-8 justify-end content-center">
                <Select options={sortByOptions} name="sortBy" value={filters.sortBy} onChange={filterChange} label={"Sort by: "} />
                <Select className="block md:hidden lg:hidden" options={orderOptions} name="order" value={filters.order} onChange={filterChange}/>
                <div className="text-gray-500 hidden md:block lg:block">
                    <label className="mr-3 text-sm">Order:</label>
                    <button onClick={() => filterChange('order', orderOptions[0].value)} className="rounded-l-lg border border-gray-200 bg-white text-sm px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-1 focus:ring-primary focus:text-primary">
                        {orderOptions[0].label}
                    </button>
                    <button onClick={() => filterChange('order', orderOptions[1].value)} className="rounded-r-md border border-gray-200 bg-white text-sm px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-1 focus:ring-primary focus:text-primary">
                        {orderOptions[1].label}
                    </button>
                </div>
            </div>
         
            {isLoading && <Loader fixed />}

            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {articles.map((article) => {
                    return  <ArticlesCard key={article.article_id} article={article} />
                })}
            </ul>
        </>)
    }
}
