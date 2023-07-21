import { createContext, useState } from "react";

export const UserContext = createContext(null)

export const UserProvider = (props) => {
    const [user, setUser] = useState({
        avatar_url : "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
        name: "Jess Jelly",
        username : "jessjelly"
    })
    return (
        <UserContext.Provider value={{ user, setUser }}>
        {props.children}
        </UserContext.Provider> 
    )
}