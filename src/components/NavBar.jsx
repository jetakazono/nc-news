import { Link } from "react-router-dom"

export const NavBar = (props) => {
    const { topics } = props

    return ( 
        <ul {...props}>
            <li key='home'>
                <Link className=" text-[#eb1b24] hover:text-gray-950" to="/">Home</Link>
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