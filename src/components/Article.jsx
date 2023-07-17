import { formatDate } from "../utils/formating"

export const Article = ({ article }) => {
    
    return (
        <li className="basis-30" >
            <img src={article.article_img_url} alt="" />
            <h2>{article.title}</h2>
            <p>by:{article.author}</p>
            <span>{formatDate(article.created_at)}</span>
            <p>Votes:<span>{article.votes}</span></p>
            <p>comments:<span>{article.comment_count}</span></p>
        </li>
    )
}
