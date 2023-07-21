import { Link } from "react-router-dom"

export const NavBar = (props) => {
    const { topics } = props

    return ( 
        <ul {...props}>
            <li key='home'>
                <Link className="text-sm text-gray-800 hover:text-gray-950" to="all">All</Link>
            </li>
            {topics.map((topic) => (
                <li key={topic.slug}>
                    <Link to={`/${topic.slug}`} className=" text-gray-600 hover:text-gray-950 no-underline hover:underline">
                        {topic.slug}
                    </Link>
                </li>
            ))}
        </ul>
    )
}