import { useEffect, useState, useContext } from "react"
import { getUsers } from "../utils/api";
import { UserContext } from "../contexts/User"
import { storage } from "../utils";
import { Select } from ".";

export const Users = () => {
    const [users, setUsers] = useState([])
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        getUsers().then((result) => {
            setUsers(result)
            const u = storage.getItem("user")
            if(u) setUser(u)
        })
    }, [])

    const handleInputChange = (key, value) => {
        const userLoggedIn = (value)
        const userLog = users.find(user => user.username === userLoggedIn.username)
        storage.setUser(userLog)
        setUser(userLog)
    }

    return (
        <Select options={users} name="users" value={user.username} valueKey="username" labelKey="username" onChange={handleInputChange} />
    )
}   