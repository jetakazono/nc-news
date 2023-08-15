import toast from 'react-hot-toast';
import { UserContext } from "../contexts/User"
import { useEffect, useState, useContext } from "react"
import { Loader, Logo, NavBar, Users } from "."

import Hamburger from "../assets/hamburguer.svg"
import Cross from "../assets/cross.svg"
import { addItem, removeItem } from '../utils/storage';
import { Link } from 'react-router-dom';

export const Header = ( { topics } ) => {
	const [menu, setMenu] = useState(false)
	
	const { user, setUser } = useContext(UserContext)

  
	
	const login = () => {
		setUser({
			avatar_url : "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
			name: "Jess Jelly",
			username : "jessjelly"
		})
		addItem("user", user)
	}
	const logout = () => {
		setUser()
		removeItem("user")
	}

	// if (apiError) {
	// 	return <Error  
	// 	errorStatus={apiError.response.status} 
	// 	errorMessage={apiError.response.data.msg}/>
	// } else if(isLoading) return <Loader />
	// else {
        return (<>
        <header className="bg-gray-100 fixed z-50 w-full top-0 h-14 md:h-16 flex items-center">
			<nav className="relative px-2 md:px-8 flex justify-between items-center w-full">
				<Logo /> 
				{/* Menu (Desktop) */}
				<NavBar topics={topics} className="capitalize hidden md:flex gap-4 m-0"/>
				{user && <div><Link to={'/new-article'}>New Articles</Link></div>}
					<div className="flex md:gap-4">
					{/* User Dropdown */}
						{ user && <div className="flex flex-row items-center justify-between gap-0 sm:justify-end">
							<button>
								<Users className="group flex shrink-0 items-center rounded-lg transition" />
							</button>
							<img alt={user.name} src={user.avatar_url} className="border-2 border-primary  shadow-primary h-10 w-10 rounded-full"/>
						</div>}
					<button className='hidden md:hidden lg:block' onClick={user? logout : login}>
						{user ? <svg className="h-6 w-6 text-primary"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>:
						<svg className="h-6 w-6 text-gray-700"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
					</svg>}
					</button>
					{/* Hamburger menu (Mobile) */}
					<div className="md:hidden">
						<button className="navbar-burger flex items-center text-red-600 p-3" onClick={() => setMenu(!menu)}>
							<img  src={menu ? Cross : Hamburger} className="h-5" alt="menu-hamburguer" />
						</button>
					</div>
					</div>
			</nav>
        </header>

		{/* Sidebar mobile */}
		<div className="navbar-menu relative z-40 data-[open=false]:hidden" data-open={menu}>
			<div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
			<nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-20 px-6 bg-white border-r overflow-y-auto">
				<NavBar topics={topics} className="flex flex-col capitalize gap-4"/>
				<div className="mt-auto relative">
					{ user 
						? <button onClick={logout} className="w-full px-4 py-3 text-xs font-semibold bg-gray-200 hover:bg-gray-300 rounded-xl">Logout</button>
						: <button onClick={login} className="w-full px-4 py-3 text-xs text-white font-semibold bg-gray-600 hover:bg-gray-700 rounded-xl">Login</button>
					}
				</div>
			</nav>
		</div>
    </>)
	// }
}