import { Link } from "react-router-dom"
import { UserContext } from "../contexts/User"
import { useContext } from "react"

export const NavBar = (props) => {
    const { topics } = props
    const { user } = useContext(UserContext)
    const test = () =>{
        
    }
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
            {user && <li className='text-gray-600 hover:text-primary'><Link onClick={test} to={'/new-article'}>New Articles</Link></li>}
        </ul>
    )
}