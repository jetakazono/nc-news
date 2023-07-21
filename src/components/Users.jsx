import { useEffect, useState, useContext } from "react"
import { getUsers } from "../utils/api";
import { UserContext } from "../contexts/User"
 
export const Users = () => {
    const [users, setUsers] = useState([])
    const { setUser } = useContext(UserContext)

    useEffect(() => {
        getUsers().then((result) => {
            setUsers(result)
        })
    }, [])

    const handleInputChange = (e) => {
        const userLoggedIn = e.target.value
        const userLog = users.find(user => user.username === userLoggedIn)
        setUser(userLog)
    }

    return (
        <select onChange={handleInputChange} name="users" value={users.username} className="bg-transparent text-sm capitalize outline-none">
            <option key="SignOut" value="SignOut">Sign Out</option>
            {users.map((user) => <option key={user.username} value={user.username}>{user.username}</option>)}
        </select> 
    )
}   