import { Link } from "react-router-dom"

export const NavBar = (props) => {
    const { topics } = props

    return ( 
        <ul {...props}>
            <li key='home'>
                <Link className="text-sm text-gray-800 hover:text-gray-950" to="/">Home</Link>
            </li>
            {topics.map((topic, index) => (
                <li key={index}>
                    <Link to={`/${topic.slug}`} className="text-sm text-gray-700 hover:text-gray-900">
                        {topic.slug}
                    </Link>
                </li>
            ))}
        </ul>
    )
}