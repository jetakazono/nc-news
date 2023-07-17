import { formatDate } from "../utils/formating"

export const Article = ({ article }) => {
    
    return (
        <li class="overflow-hidden rounded-lg shadow transition hover:shadow-lg relative">
            <div class="bg-white h-full flex flex-col">
                <img src={article.article_img_url} alt="" class="h-56 w-full object-cover"/>
                <div className="p-2 sm:p-4 flex flex-1 flex-col justify-between">
                    <a href="#" className="block before:absolute before:inset-0">
                        <h2 class="mt-0.5 text-lg text-gray-900">
                            {article.title}
                        </h2>
                    </a>

                    <p className="text-sm">
                        <span className="text-gray-500">posted by:</span> {article.author}
                    </p>
                    <time datetime={article.created_at} class="block text-xs text-gray-500">
                        {formatDate(article.created_at)}
                    </time>

                    {/* <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 mb-4">
                   {article.body}}
                    </p> */}

                    <footer className="flex justify-between relative">
                        <p>Votes:<span>{article.votes}</span></p>
                        <p>comments:<span>{article.comment_count}</span></p>
                    </footer>
                </div>
            </div>
        </li>
    )
}

