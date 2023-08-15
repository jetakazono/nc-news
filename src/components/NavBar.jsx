import { Link } from "react-router-dom"

export const NavBar = (props) => {
    const { topics } = props

    return ( 
        <ul {...props}>
            <li key='home'>
                <Link className="text-gray-600 hover:text-primary" to="all">All</Link>
            </li>
            {topics.map((topic) => (
                <li key={topic.slug}>
                    <Link to={`/${topic.slug}`} className=" text-gray-600 hover:text-primary no-underline">
                        {topic.slug}
                    </Link>
                </li>
            ))}
            <li><Link to={'/new-article'}></Link></li>
        </ul>
    )
}