import { formatDate } from "../utils/formating"
import { Link } from "react-router-dom"
export const ArticlesCard = ({ article }) => {

    return (
        <li className="overflow-hidden rounded-lg shadow transition hover:shadow-lg relative transform hover:-translate-y-2">
            <Link to={`/articles/${article.article_id}`} className="bg-white h-full flex flex-col">
                <img src={article.article_img_url} alt="" className="h-56 w-full object-cover"/>
                <div className="p-4 flex flex-1 flex-col justify-between">
                    <h2 className="mt-0.5 text-lg text-gray-900 ">
                        {article.title}
                    </h2>

                    <p className="text-sm">
                        <span className="text-gray-500">posted by:</span> {article.author}
                    </p>
                    <time dateTime={article.created_at} className="block text-xs text-gray-500">
                        {formatDate(article.created_at)}
                    </time>

                    <footer className="flex justify-end gap-3 relative">
                        <svg className="w-6 h-6 text-red-300 hover:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"/>
                        </svg>
                        <span>{article.votes}</span>

                        <svg className="w-6 h-6 text-gray-400 hover:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 5h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-2v3l-4-3H8m4-13H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2v3l4-3h4a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                        </svg>
                        <span>{article.comment_count}</span>
                    </footer>
                </div>
            </Link>
        </li>
    )
}

